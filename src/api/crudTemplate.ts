import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";
import { logger } from "@/lib/logger";

type RepositoryMethods<T> = {
  list?: (pagination?: PaginationParams) => Promise<T[] | PaginatedResponse<T>>;
  findById?: (id: string) => Promise<T | null>;
  create?: (data: any) => Promise<T>;
  update?: (id: string, data: any) => Promise<T>;
  delete?: (id: string) => Promise<void>;
};

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PaginationParams {
  page?: number;
  limit?: number;
}

interface ErrorResponse {
  error: string;
  details?: string;
  fields?: Record<string, string[]>;
}

const ERROR_MESSAGES = {
  INVALID_ID: 'ID inválido. O ID fornecido não é um número válido.',
  NOT_FOUND: (entity: string) => `${entity} não encontrado(a)`,
  METHOD_NOT_IMPLEMENTED: (method: string, entity: string) =>
    `Método ${method} não implementado para ${entity}`,
  VALIDATION_ERROR: 'Erro de validação',
  UNEXPECTED_ERROR: 'Ocorreu um erro inesperado',
  INTERNAL_SERVER_ERROR: 'Erro interno do servidor',
  FAILED_OPERATION: (operation: string, entity: string) =>
    `Falha ao ${operation} ${entity}`,
};

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  pagination: PaginationParams
): PaginatedResponse<T> {
  const { page = 1, limit = 10 } = pagination;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
  };
}

export function getPaginationParams(params: PaginationParams) {
  const { page = 1, limit = 10 } = params;
  const parsedPage = Math.max(1, Number(page));
  const parsedLimit = Math.max(1, Math.min(Number(limit), 100));
  const skip = (parsedPage - 1) * parsedLimit;

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip,
  };
}

export const parseIdFromRequest = (req: NextRequest): string | null => {
  const idString = req.nextUrl.pathname.split('/').pop();
  if (!idString) return null;

  // const id = Number(idString);
  return idString;
};

export function withIdValidation(
  handler: (id: string, req: NextRequest) => Promise<NextResponse>,
  idParamName: string = 'id'
) {
  return async (req: NextRequest) => {
    const id = parseIdFromRequest(req);

    if (!id) {
      logger.warn(`ID inválido recebido: ${req.nextUrl.pathname}`);
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_ID },
        { status: 400 }
      );
    }

    return handler(id, req);
  };
}

export function createErrorResponse(
  error: unknown,
  context: string,
  statusCode: number,
  req?: NextRequest
): ErrorResponse {
  let errorMessage = ERROR_MESSAGES.UNEXPECTED_ERROR;
  let errorDetails = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  let fieldErrors: Record<string, string[]> = {};

  if (error instanceof ZodError) {
    errorMessage = ERROR_MESSAGES.VALIDATION_ERROR;
    errorDetails = fromZodError(error).message;
    // @ts-ignore
    fieldErrors = error.flatten().fieldErrors;
    statusCode = 400;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || error.message;
  }

  logger.error(`[${statusCode}] ${context}: ${errorMessage}`, {
    error: errorDetails,
    fields: fieldErrors,
    request: req && {
      method: req.method,
      path: req.nextUrl.pathname,
      searchParams: Object.fromEntries(req.nextUrl.searchParams),
    }
  });

  return {
    error: errorMessage,
    details: statusCode >= 500 ? ERROR_MESSAGES.INTERNAL_SERVER_ERROR : errorDetails,
    fields: Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
  };
}

interface CrudConfig<T> {
  entityName: string;
  repository: RepositoryMethods<T>;
  schema?: z.ZodSchema<T>;
  idParamName?: string;
  enablePagination?: boolean;
}

export function createCrudHandlers<T>(config: CrudConfig<T>) {
  const {
    entityName,
    repository,
    schema,
    idParamName = 'id',
    enablePagination = false
  } = config;

  const handleError = (error: unknown, context: string, req?: NextRequest, statusCode = 500) => {
    const errorResponse = createErrorResponse(
      error,
      ERROR_MESSAGES.FAILED_OPERATION(context, entityName),
      statusCode,
      req
    );
    return NextResponse.json(errorResponse, { status: statusCode });
  };

  const validateAndParse = async (data: unknown) => {
    if (!schema) return data;
    return schema.parse(data);
  };

  const GET = async (req: NextRequest) => {
    const token = req.cookies.get("authjs.session-token");
    const { pathname } = req.nextUrl
    const publicRoutes = ['/api/usuarios']

    if (!token && !publicRoutes.includes(pathname)) {
      return NextResponse.json('Usuário não autenticado', { status: 401 });
    }

    try {
      if (!repository.list) {
        throw new Error(ERROR_MESSAGES.METHOD_NOT_IMPLEMENTED('listar', entityName));
      }

      logger.info(`[${entityName}] Listar iniciado`, {
        searchParams: Object.fromEntries(req.nextUrl.searchParams)
      });

      let result;
      if (enablePagination) {
        const { page, limit } = Object.fromEntries(req.nextUrl.searchParams);
        const pagination = getPaginationParams({
          page: page ? Number(page) : undefined,
          limit: limit ? Number(limit) : undefined
        });
        result = await repository.list(pagination);
      } else {
        result = await repository.list();
      }

      logger.info(`[${entityName}] Listar concluído`);
      return NextResponse.json(result);
    } catch (error) {
      return handleError(error, 'listar', req);
    }
  };

  const POST = async (req: NextRequest) => {
    try {
      if (!repository.create) {
        throw new Error(ERROR_MESSAGES.METHOD_NOT_IMPLEMENTED('criar', entityName));
      }

      const body = await req.json();
      logger.debug(`[${entityName}] Dados recebidos no POST`, { body });

      const validatedData = await validateAndParse(body);
      const newItem = await repository.create(validatedData);

      logger.info(`[${entityName}] Criado com sucesso`);
      return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
      return handleError(error, 'criar', req, error instanceof ZodError ? 400 : 500);
    }
  };

  const GET_BY_ID = withIdValidation(async (id: string, req: NextRequest) => {
    try {
      if (!repository.findById) {
        throw new Error(ERROR_MESSAGES.METHOD_NOT_IMPLEMENTED('buscar por ID', entityName));
      }

      logger.info(`[${entityName}] Buscar por ID iniciado`, { id });

      const item = await repository.findById(id);
      if (!item) {
        logger.warn(`[${entityName}] Não encontrado`, { id });
        return NextResponse.json(
          { error: ERROR_MESSAGES.NOT_FOUND(entityName) },
          { status: 404 }
        );
      }

      logger.info(`[${entityName}] Encontrado`, { id });
      return NextResponse.json(item);
    } catch (error) {
      return handleError(error, 'buscar', req);
    }
  }, idParamName);

  const PUT = withIdValidation(async (id: string, req: NextRequest) => {
    try {
      if (!repository.update) {
        throw new Error(ERROR_MESSAGES.METHOD_NOT_IMPLEMENTED('atualizar', entityName));
      }

      const body = await req.json();
      logger.debug(`[${entityName}] Dados recebidos no PUT`, { id, body });

      const validatedData = await validateAndParse(body);
      const updatedItem = await repository.update(id, validatedData);

      logger.info(`[${entityName}] Atualizado com sucesso`, { id });
      return NextResponse.json(updatedItem);
    } catch (error) {
      return handleError(error, 'atualizar', req, error instanceof ZodError ? 400 : 500);
    }
  }, idParamName);

  const DELETE = withIdValidation(async (id: string, req: NextRequest) => {
    try {
      if (!repository.delete) {
        throw new Error(ERROR_MESSAGES.METHOD_NOT_IMPLEMENTED('deletar', entityName));
      }

      logger.info(`[${entityName}] Deletando item`, { id });
      await repository.delete(id);
      logger.info(`[${entityName}] Item deletado com sucesso`, { id });

      return new NextResponse(null, { status: 204 });
    } catch (error) {
      return handleError(error, 'deletar', req);
    }
  }, idParamName);

  return { GET, POST, GET_BY_ID, PUT, DELETE };
}

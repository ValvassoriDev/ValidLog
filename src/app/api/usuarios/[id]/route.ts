import { createCrudHandlers } from "@/api/crudTemplate";
import { usuarioRepository } from "@/repositories/usuarioRepository";
import { z } from "zod";

const usuarioSchema = z.object({
  matricula: z.string().min(1, "Matrícula é obrigatória"),
  nomeCompleto: z.string().min(1, "Nome completo é obrigatório"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  nivelAcesso: z.string().min(1, "Nível de acesso é obrigatório"),
  hospitalId: z.string().nullable().optional(),
}).partial();

const { GET_BY_ID, PUT, DELETE } = createCrudHandlers({
  entityName: "usuario",
  repository: usuarioRepository,
  // @ts-ignore
  schema: usuarioSchema,
  enablePagination: true,
  idParamName: "id"
});

export { GET_BY_ID as GET, PUT, DELETE };

export const dynamic = "force-dynamic";

import { createCrudHandlers } from "@/api/crudTemplate";
import { usuarioRepository } from "@/repositories/usuarioRepository";
import { z } from "zod";

const usuarioSchema = z.object({
  matricula: z.string().min(1, "Matrícula é obrigatória"),
  nomeCompleto: z.string().min(1, "Nome completo é obrigatório"),
  senha: z.string().min(1, "Senha é obrigatória"),
  nivelAcesso: z.string().min(1, "Nível de acesso é obrigatório"),
  hospitalId: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional()
});

const { GET, POST } = createCrudHandlers({
  entityName: "usuario",
  repository: usuarioRepository,
  // @ts-ignore
  schema: usuarioSchema,
  enablePagination: false
});

export { GET, POST };

export const dynamic = "force-dynamic";

import { createCrudHandlers } from "@/api/crudTemplate";
import { cateterRepository } from "@/repositories/cateterRepository";
import { z } from "zod";

const cateterSchema = z
  .object({
    registroPaciente: z.string().min(1, "Registro do paciente é obrigatório"),
    tipoCateter: z.string().min(1, "Tipo de cateter é obrigatório"),
    identificacaoStatus: z
      .string()
      .min(1, "Status de identificação é obrigatório"),
    condicao: z.string().min(1, "Condição é obrigatória"),
    turno: z.string().min(1, "Turno é obrigatório"),
    situacao: z.string().optional(),
    hospitalId: z.string().min(1, "Hospital é obrigatório"),
    pacienteId: z.string().min(1, "Paciente é obrigatório"),
    insertedBy: z
      .string()
      .min(1, { message: "Usuário, se fornecido, deve ser válido." })
      .optional(),
  })
  .partial();

const { GET_BY_ID, PUT, DELETE } = createCrudHandlers({
  entityName: "cateter",
  repository: cateterRepository,
  //@ts-ignore
  schema: cateterSchema,
  enablePagination: true,
  idParamName: "id",
});

export { GET_BY_ID as GET, PUT, DELETE };

export const dynamic = "force-dynamic";

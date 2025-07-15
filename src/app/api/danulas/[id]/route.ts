import { createCrudHandlers } from "@/api/crudTemplate";
import { danulaRepository } from "@/repositories/danulaRepository";
import { z } from "zod";

const danulaSchema = z
  .object({
    registroPaciente: z.string().min(1, "Registro do paciente é obrigatório"),
    turno: z.string().min(1, "Turno é obrigatório"),
    situacao: z.string().optional(),
    hospitalId: z.string().min(1, "Hospital é obrigatório"),
    pacienteId: z.string().min(1, "Paciente é obrigatório"),
  })
  .partial();

const { GET_BY_ID, PUT, DELETE } = createCrudHandlers({
  entityName: "danula",
  repository: danulaRepository,
  //@ts-ignore
  schema: danulaSchema,
  enablePagination: true,
  idParamName: "id",
});

export { GET_BY_ID as GET, PUT, DELETE };

export const dynamic = "force-dynamic";

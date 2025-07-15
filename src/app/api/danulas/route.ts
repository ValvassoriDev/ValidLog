import { createCrudHandlers } from "@/api/crudTemplate";
import { danulaRepository } from "@/repositories/danulaRepository";
import { z } from "zod";

const danulaSchema = z.object({
  registroPaciente: z.string().min(1, "Registro do paciente é obrigatório"),
  turno: z.string().min(1, "Turno é obrigatório"),
  situacao: z.string().optional(),
  hospitalId: z.string().min(1, "Hospital é obrigatório"),
  pacienteId: z.string().min(1, "Paciente é obrigatório"),
});

const { GET, POST } = createCrudHandlers({
  entityName: "danula",
  repository: danulaRepository,
  // @ts-ignore
  schema: danulaSchema,
  enablePagination: false,
});

export { GET, POST };

export const dynamic = "force-dynamic";

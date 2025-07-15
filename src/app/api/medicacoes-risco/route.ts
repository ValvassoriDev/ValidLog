import { createCrudHandlers } from "@/api/crudTemplate";
import { medicacaoRiscoRepository } from "@/repositories/medicacaoRiscoRepository";
import { z } from "zod";

const medicacaoRiscoSchema = z.object({
  registroPaciente: z.string().min(1, "Registro do paciente é obrigatório"),
  medicacao: z.string().min(1, "Medicação é obrigatória"),
  duracaoHoras: z.number().min(1, "Duração em horas é obrigatória"),
  turno: z.string().min(1, "Turno é obrigatório"),
  situacao: z.string().optional(),
  hospitalId: z.string().min(1, "Hospital é obrigatório"),
  pacienteId: z.string().min(1, "Paciente é obrigatório"),
});

const { GET, POST } = createCrudHandlers({
  entityName: "medicacaoRisco",
  repository: medicacaoRiscoRepository,
  // @ts-ignore
  schema: medicacaoRiscoSchema,
  enablePagination: false,
});

export { GET, POST };

export const dynamic = "force-dynamic";

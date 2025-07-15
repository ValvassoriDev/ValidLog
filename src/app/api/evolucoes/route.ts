import { createCrudHandlers } from "@/api/crudTemplate";
import { evolucaoRepository } from "@/repositories/evolucaoRepository";
import { z } from "zod";

const evolucaoSchema = z.object({
  registroPaciente: z.string().min(1, "Registro do paciente é obrigatório"),
  anotacao: z.string().min(1, "Anotação é obrigatória"),
  profissional: z.string().min(1, "Profissional é obrigatório"),
  turno: z.string().min(1, "Turno é obrigatório"),
  hospitalId: z.string().min(1, "Hospital é obrigatório"),
  pacienteId: z.string().min(1, "Paciente é obrigatório"),

});

const { GET, POST } = createCrudHandlers({
  entityName: "evolucao",
  repository: evolucaoRepository,
  // @ts-ignore
  schema: evolucaoSchema,
  enablePagination: false
});

export { GET, POST };

export const dynamic = "force-dynamic";

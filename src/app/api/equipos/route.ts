import { createCrudHandlers } from "@/api/crudTemplate";
import { equipoRepository } from "@/repositories/equipoRepository";
import { z } from "zod";

const equipoSchema = z.object({
  registroPaciente: z.string().min(1, "Registro do paciente é obrigatório"),
  tipo: z.string().min(1, "Tipo de equipo é obrigatório"),
  turno: z.string().min(1, "Turno é obrigatório"),
  situacao: z.string().optional(),
  hospitalId: z.string().min(1, "Hospital é obrigatório"),
  pacienteId: z.string().min(1, "Paciente é obrigatório"),
});

const { GET, POST } = createCrudHandlers({
  entityName: "equipo",
  repository: equipoRepository,
  // @ts-ignore
  schema: equipoSchema,
  enablePagination: false,
});

export { GET, POST };

export const dynamic = "force-dynamic";

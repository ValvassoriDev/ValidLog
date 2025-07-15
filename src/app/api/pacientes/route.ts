import { createCrudHandlers } from "@/api/crudTemplate";
import { pacienteRepository } from "@/repositories/pacienteRepository";
import { Status } from "@prisma/client";
import { z } from "zod";

const pacienteSchema = z.object({
  registroPaciente: z.string().min(1, "Registro do paciente é obrigatório"),
  nomeCompleto: z.string().min(1, "Nome completo é obrigatório"),
  abreviacaoNome: z.string().min(1, "Abreviação do nome é obrigatória"),
  roomNumber: z.string().min(1, { message: "Número do quarto é obrigatório" }),
  sexo: z.string().min(1, "Sexo é obrigatório"),
  hospitalId: z.string().min(1, "Hospital é obrigatório"),
});

const { GET, POST } = createCrudHandlers({
  entityName: "paciente",
  repository: pacienteRepository,
  // @ts-ignore
  schema: pacienteSchema,
  enablePagination: false,
});

export { GET, POST };

export const dynamic = "force-dynamic";

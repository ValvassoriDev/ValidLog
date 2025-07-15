import { createCrudHandlers } from "@/api/crudTemplate";
import { pacienteRepository } from "@/repositories/pacienteRepository";
import { Status } from "@prisma/client";
import { z } from "zod";

const pacienteSchema = z
  .object({
    registroPaciente: z.string().min(1, "Registro do paciente é obrigatório"),
    nomeCompleto: z.string().min(1, "Nome completo é obrigatório"),
    roomNumber: z.string().min(1, { message: "Número do quarto é obrigatório" }),
    abreviacaoNome: z
      .string()
      .min(1, { message: "Abreviação do nome é obrigatória." }),
    sexo: z.string().min(1, "Sexo é obrigatório"),
    hospitalId: z.string().min(1, "Hospital é obrigatório"),
    status: z
      .nativeEnum(Status, {
        errorMap: () => ({ message: "Status é obrigatório" }),
      }),
  })
  .partial();

const { GET_BY_ID, PUT, DELETE } = createCrudHandlers({
  entityName: "paciente",
  repository: pacienteRepository,
  //@ts-ignore
  schema: pacienteSchema,
  enablePagination: true,
  idParamName: "id",
});

export { GET_BY_ID as GET, PUT, DELETE };

export const dynamic = "force-dynamic";

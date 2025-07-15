import { Sexo, Status } from "@prisma/client";
import { z } from "zod";

export const pacienteSchema = z.object({
  registroPaciente: z
    .string()
    .min(1, { message: "Registro do paciente é obrigatório." }),
  nomeCompleto: z.string().min(1, { message: "Nome completo é obrigatório." }),
  roomNumber: z.string().min(1, { message: "Número do quarto é obrigatório" }),
  abreviacaoNome: z
    .string()
    .min(1, { message: "Abreviação do nome é obrigatória." }),
  sexo: z.nativeEnum(Sexo, {
    errorMap: () => ({ message: "Sexo é obrigatório." }),
  }),
  hospitalId: z.string({
    invalid_type_error: "O ID do hospital é obrigatório.",
  }),
});

export type PacienteFormSchema = z.infer<typeof pacienteSchema>;

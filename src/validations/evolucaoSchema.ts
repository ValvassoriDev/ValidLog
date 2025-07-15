import { z } from "zod";
import { Turno } from "@prisma/client";

export const evolucaoSchema = z.object({
  registroPaciente: z
    .string()
    .min(1, { message: "O registro do paciente é obrigatório." }),
  anotacao: z
    .string()
    .min(1, { message: "A anotação é obrigatória." }),
  profissional: z
    .string()
    .min(1, { message: "O nome do profissional é obrigatório." }),
  turno: z
    .nativeEnum(Turno, {
      errorMap: () => ({ message: "O turno é obrigatório." }),
    }),
  hospitalId: z
    .string({ invalid_type_error: "O ID do hospital é obrigatório." }),
  pacienteId: z
    .string({ invalid_type_error: "O ID do paciente é obrigatório." }),
});

export type EvolucaoFormSchema = z.infer<typeof evolucaoSchema>;

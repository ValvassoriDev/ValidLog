import { Situacao, Turno } from "@prisma/client";
import { z } from "zod";

export const medicacaoRiscoSchema = z.object({
  registroPaciente: z
    .string()
    .min(1, { message: "O registro do paciente é obrigatório." }),
  medicacao: z.string().min(1, { message: "A medicação é obrigatória." }),
  duracaoHoras: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "A duração em horas deve ser maior que 0.",
    }),
  turno: z.nativeEnum(Turno, {
    errorMap: () => ({ message: "O turno é obrigatório." }),
  }),
  situacao: z
    .nativeEnum(Situacao, {
      errorMap: () => ({ message: "A situação é obrigatória." }),
    })
    .default(Situacao.Manter),
  hospitalId: z.string({
    invalid_type_error: "O ID do hospital é obrigatório.",
  }),
  pacienteId: z.string({
    invalid_type_error: "O ID do paciente é obrigatório.",
  }),
});

export type MedicacaoRiscoFormSchema = z.infer<typeof medicacaoRiscoSchema>;

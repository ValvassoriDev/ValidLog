import { ModeloPelicula, Situacao, Turno } from "@prisma/client";
import { z } from "zod";

export const peliculaSchema = z.object({
  registroPaciente: z
    .string()
    .min(1, { message: "O registro do paciente é obrigatório." }),
  modeloPelicula: z.nativeEnum(ModeloPelicula, {
    errorMap: () => ({ message: "O modelo de película é obrigatório." }),
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

export type PeliculaFormSchema = z.infer<typeof peliculaSchema>;

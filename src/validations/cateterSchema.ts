import { z } from "zod";
import {
  CondicaoCateter,
  IdentificacaoStatus,
  TipoCateter,
  Turno,
} from "@prisma/client";

export const cateterSchema = z.object({
  registroPaciente: z
    .string()
    .min(1, { message: "Registro do paciente é obrigatório" }),
  tipoCateter: z.nativeEnum(TipoCateter, {
    errorMap: () => ({ message: "O tipo de cateter é obrigatório" }),
  }),
  identificacaoStatus: z.nativeEnum(IdentificacaoStatus, {
    errorMap: () => ({ message: "O status de identificação é obrigatório" }),
  }),
  condicao: z.nativeEnum(CondicaoCateter, {
    errorMap: () => ({ message: "A condição do cateter é obrigatória" }),
  }),
  turno: z.nativeEnum(Turno, {
    errorMap: () => ({ message: "O turno é obrigatório" }),
  }),
  hospitalId: z
    .string({ invalid_type_error: "O ID do hospital é obrigatório." }),
  pacienteId: z
    .string({ invalid_type_error: "O ID do paciente é obrigatório." }),
});

export type CateterFormSchema = z.infer<typeof cateterSchema>;

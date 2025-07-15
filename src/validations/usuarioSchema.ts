import { z } from "zod";
import { NivelAcesso } from "@prisma/client";

export const usuarioSchema = z.object({
  matricula: z
    .string()
    .min(1, { message: "Matrícula é obrigatória" }),
  nomeCompleto: z
    .string()
    .min(1, { message: "Nome completo é obrigatório" }),
  senha: z
    .string()
    .min(6, { message: "Senha deve ter ao menos 6 caracteres" }),
  nivelAcesso: z
    .nativeEnum(NivelAcesso, {
      errorMap: () => ({ message: "Nível de acesso é obrigatório" }),
    }),
  hospitalId: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional()
});

export type UsuarioFormSchema = z.infer<typeof usuarioSchema>;

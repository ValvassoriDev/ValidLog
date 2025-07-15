import { z } from "zod";

export const hospitalSchema = z.object({
  nome: z.string().min(1, "Nome do hospital é obrigatório"),
  endereco: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  cnpj: z.string().optional()
});

export type HospitalSchemaFormSchema = z.infer<typeof hospitalSchema>;

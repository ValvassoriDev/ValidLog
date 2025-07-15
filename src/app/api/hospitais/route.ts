import { createCrudHandlers } from "@/api/crudTemplate";
import { hospitalRepository } from "@/repositories/hospitalRepository";
import { z } from "zod";

const hospitalSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  endereco: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  cnpj: z.string().optional()
});

const { GET, POST } = createCrudHandlers({
  entityName: "hospital",
  repository: hospitalRepository,
  // @ts-ignore
  schema: hospitalSchema,
  enablePagination: false
});

export { GET, POST };

export const dynamic = "force-dynamic";

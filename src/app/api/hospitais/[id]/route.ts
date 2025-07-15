import { createCrudHandlers } from "@/api/crudTemplate";
import { hospitalRepository } from "@/repositories/hospitalRepository";
import { z } from "zod";

const hospitalSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  endereco: z.string().optional(),
}).partial();

const { GET_BY_ID, PUT, DELETE } = createCrudHandlers({
  entityName: "hospital",
  repository: hospitalRepository,
  //@ts-ignore
  schema: hospitalSchema,
  enablePagination: true,
  idParamName: "id"
});

export { GET_BY_ID as GET, PUT, DELETE };

export const dynamic = "force-dynamic";

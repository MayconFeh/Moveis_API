import { z } from "zod";

const categorySchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

const categorySchemaCreate = categorySchema.omit({ id: true });
const categoryReadSchema = categorySchema.array();

export { categorySchema, categorySchemaCreate, categoryReadSchema };
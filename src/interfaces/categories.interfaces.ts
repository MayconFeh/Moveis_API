import { z } from "zod";
import {
  categoryReadSchema,
  categorySchema,
  categorySchemaCreate,
} from "../schemas/categories.schemas";

type Categories = z.infer<typeof categorySchema>;
type CategoryCreate = z.infer<typeof categorySchemaCreate>;
type CategoryRead = z.infer<typeof categoryReadSchema>;

export { Categories, CategoryCreate, CategoryRead };

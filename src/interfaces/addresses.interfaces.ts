import { z } from "zod";
import {
  addressSchema,
  addressSchemaCreate,
} from "../schemas/addresses.schemas";

type AddressSchema = z.infer<typeof addressSchema>;
type AddressSchemaCreate = z.infer<typeof addressSchemaCreate>;

export { AddressSchema, AddressSchemaCreate };

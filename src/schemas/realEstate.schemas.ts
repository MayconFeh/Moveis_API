import { z } from "zod";
import { addressSchema, addressSchemaCreate } from "./addresses.schemas";

const realEstateSchema = z.object({
  id: z.number(),
  value: z.string().or(z.number().nonnegative()),
  size: z.number().int().positive(),
  sold: z.boolean().default(false),
  address: addressSchemaCreate,
  createdAt: z.string(),
  updatedAt: z.string(),
  categoryId: z.number(),
});

const realEstateSchemaCreate = realEstateSchema.omit({
  id: true,
  sold: true,
  createdAt: true,
  updatedAt: true,
});

const realEstateSchemaReturn = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.string().or(z.number().nonnegative()),
  size: z.number().int().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  address: addressSchema,
});

const realEstateReadSchema = realEstateSchemaReturn.array();

export {
  realEstateSchema,
  realEstateSchemaCreate,
  realEstateReadSchema,
};
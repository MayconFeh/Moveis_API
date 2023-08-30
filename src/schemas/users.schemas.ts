import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().max(45).email(),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

const userSchemaCreate = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userSchemaReturn = userSchema.omit({ password: true });

const userSchemaEmailCreate = userSchema.pick({ email: true });

const userReadSchema = userSchemaReturn.array();
const updateUserSchema = userSchemaCreate.omit({ admin: true }).partial();

export {
  userSchema,
  userSchemaCreate,
  userSchemaReturn,
  userSchemaEmailCreate,
  userReadSchema,
  updateUserSchema,
};

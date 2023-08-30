import { z } from "zod";
import {
  updateUserSchema,
  userReadSchema,
  userSchema,
  userSchemaEmailCreate,
  userSchemaCreate,
  userSchemaReturn,
} from "../schemas/users.schemas";
import { DeepPartial } from "typeorm";

type User = z.infer<typeof userSchema>;
type UserCreate = z.infer<typeof userSchemaCreate>;
type UserReturn = z.infer<typeof userSchemaReturn>;
type UserEmail = z.infer<typeof userSchemaEmailCreate>;
type UserRead = z.infer<typeof userReadSchema>;
type UserUpdate = DeepPartial<typeof updateUserSchema>;

export { User, UserCreate, UserReturn, UserEmail, UserRead, UserUpdate };

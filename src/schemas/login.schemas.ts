import { z } from "zod";

const loginSchemaCreate = z.object({
  email: z.string().email(),
  password: z.string(),
});

const loginSchemaReturn = z.object({
  token: z.string(),
});

export { loginSchemaCreate, loginSchemaReturn };
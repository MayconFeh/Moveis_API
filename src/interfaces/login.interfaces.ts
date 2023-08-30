import { z } from "zod";
import { loginSchemaCreate, loginSchemaReturn } from "../schemas/login.schemas";

type Login = z.infer<typeof loginSchemaCreate>;
type LoginReturn = z.infer<typeof loginSchemaReturn>;

export { Login, LoginReturn };

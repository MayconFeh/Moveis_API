import { Router } from "express";
import { loginSchemaCreate } from "../schemas/login.schemas";
import { sessionControllers } from "../controllers";
import middlewares from "../middlewares";

const sessionRouter: Router = Router();

sessionRouter.post(
  "",
  middlewares.validateBody(loginSchemaCreate),
  sessionControllers.create
);

export default sessionRouter
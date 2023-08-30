import { Router } from "express";
import { realEstatesControllers } from "../controllers";
import { realEstateSchemaCreate } from "../schemas/realEstate.schemas";
import middlewares from "../middlewares";

const realEstateRouter: Router = Router();

realEstateRouter.post(
  "",
  middlewares.validateToken,
  middlewares.validateAdmin,
  middlewares.validateBody(realEstateSchemaCreate),
  realEstatesControllers.create
);

realEstateRouter.get("", realEstatesControllers.read);

export default realEstateRouter;

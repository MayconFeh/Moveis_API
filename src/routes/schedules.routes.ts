import { Router } from "express";
import { schedulesControllers } from "../controllers";
import { scheduleSchemaCreate } from "../schemas/schedules.schemas";
import middlewares from "../middlewares";

const schedulesRouter: Router = Router();

schedulesRouter.post(
  "",
  middlewares.validateToken,
  middlewares.validateBody(scheduleSchemaCreate),
  middlewares.validateRealEstates,
  middlewares.validateDate,
  schedulesControllers.create
);

schedulesRouter.get(
  "/realEstate/:id",
  middlewares.validateToken,
  middlewares.validateAdmin,
  middlewares.validateRealEstates,
  schedulesControllers.read
);

export default schedulesRouter;
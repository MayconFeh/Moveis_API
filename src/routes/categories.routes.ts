import { Router } from "express";
import { categoriesControllers } from "../controllers";
import { categorySchemaCreate } from "../schemas/categories.schemas";
import middlewares from "../middlewares";

const categoriesRouter: Router = Router();

categoriesRouter.post(
  "",
  middlewares.validateToken,
  middlewares.validateAdmin,
  middlewares.validateBody(categorySchemaCreate),
  categoriesControllers.create
);

categoriesRouter.get("", categoriesControllers.read);

categoriesRouter.get(
  "/:id/realEstate",
  middlewares.validateCategoryId,
  categoriesControllers.readREByCategory
);

export default categoriesRouter
import { Router } from "express";
import middlewares from "../middlewares";
import { usersControllers } from "../controllers";
import { userSchemaCreate, updateUserSchema } from "../schemas/users.schemas";


const userRouter: Router = Router();


userRouter.post(
  "",
  middlewares.validateBody(userSchemaCreate),
  middlewares.validateEmail,
  usersControllers.create
);

userRouter.get(
  "",
  middlewares.validateToken,
  middlewares.validateAdmin,
  usersControllers.read
);

userRouter.patch(
  "/:id",
  middlewares.validateUserId,
  middlewares.validateToken,
  middlewares.validateUserPermission,
  middlewares.validateBody(updateUserSchema),
  usersControllers.update
);

userRouter.delete(
  "/:id",
  middlewares.validateUserId,
  middlewares.validateToken,
  middlewares.validateAdmin,
  usersControllers.destroy
)

export default userRouter
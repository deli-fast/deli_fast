import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
  updateUserController,
} from "../controller/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  getUsersController
);
userRouter.delete("/:id", ensureAuthMiddleware, deleteUserController);
userRouter.get("/:id", ensureAuthMiddleware, getUserByIdController);
userRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  updateUserController
);

export default userRouter;

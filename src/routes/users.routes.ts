import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
  updateUserController,
} from "../controller/users.controllers";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", getUsersController);
userRouter.delete("/:id", deleteUserController);
userRouter.get("/:id", getUserByIdController);
userRouter.patch("/:id", updateUserController);

export default userRouter;

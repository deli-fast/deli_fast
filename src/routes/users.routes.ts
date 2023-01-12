import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
} from "../controller/users.controllers";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", getUsersController);
userRouter.delete("/:id", deleteUserController);
userRouter.get("/:id", getUserByIdController);

export default userRouter;

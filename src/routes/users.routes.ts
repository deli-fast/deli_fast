import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUsersController,
} from "../controller/users.controllers";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", getUsersController);
userRouter.delete("/:id", deleteUserController);

export default userRouter;

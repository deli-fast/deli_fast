import { Router } from "express";
import {
  createUserController,
  getUsersController,
} from "../controller/users.controllers";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", getUsersController);

export default userRouter;

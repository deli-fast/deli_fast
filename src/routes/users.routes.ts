import { Router } from "express";
import { createUserController } from "../controller/users.controllers";

const userRouter = Router();

userRouter.post("", createUserController);

export default userRouter;

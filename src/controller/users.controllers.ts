import { Request, Response } from "express";
import { createUserService } from "../services/usersServices/createUser.service";
import { getUsersService } from "../services/usersServices/getUsers.service";

const createUserController = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body);
  return res.status(201).json(newUser);
};

export { createUserController };

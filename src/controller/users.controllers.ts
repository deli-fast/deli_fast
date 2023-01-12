import { Request, Response } from "express";
import { createUserService } from "../services/usersServices/createUser.service";
import { deleteUserService } from "../services/usersServices/deleteUser.service";
import { getUserByIdService } from "../services/usersServices/getUserById.service";
import { getUsersService } from "../services/usersServices/getUsers.service";
import { updateUserService } from "../services/usersServices/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body);
  return res.status(201).json(newUser);
};

const getUsersController = async (req: Request, res: Response) => {
  const users = await getUsersService();
  return res.status(200).json(users);
};

const deleteUserController = async (req: Request, res: Response) => {
  const payload = {
    userId: req.body.id,
    isAdmin: req.body.isAdmin,
    userToBeDeleted: req.params.id,
  };

  const deleted = await deleteUserService(payload);

  return res.status(200).json(deleted);
};

const getUserByIdController = async (req: Request, res: Response) => {
  const user = await getUserByIdService(req.params.id);
  return res.status(200).json(user);
};

const updateUserController = async (req: Request, res: Response) => {
  const updatedUser = await updateUserService(req.params.id, req.body);
  return res.status(200).json(updatedUser);
};

export {
  createUserController,
  getUsersController,
  deleteUserController,
  getUserByIdController,
  updateUserController,
};

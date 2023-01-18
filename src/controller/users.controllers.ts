import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { getUserByIdService } from "../services/users/getUserById.service";
import { getUsersService } from "../services/users/getUsers.service";
import { updateUserService } from "../services/users/updateUser.service";

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
    userId: req.user.id,
    isAdmin: req.user.type,
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
  const updatedUser = await updateUserService(
    req.user.id,
    req.params.id,
    req.user.type,
    req.body
  );
  return res.status(200).json(updatedUser);
};

export {
  createUserController,
  getUsersController,
  deleteUserController,
  getUserByIdController,
  updateUserController,
};

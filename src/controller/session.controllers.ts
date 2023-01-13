import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/login";
import createSessionService from "../services/session/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const sessionData: IUserLogin = req.body;
  const token = await createSessionService(sessionData);
  return res.status(200).json({ token });
};

export { createSessionController };

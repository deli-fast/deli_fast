import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/errors";

const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.type !== "ADMIN") {
    throw new AppError("Missing admin permissions", 403);
  }
  return next();
};

export default ensureIsAdmMiddleware;

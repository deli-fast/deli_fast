import { Router } from "express";
import { createSessionController } from "../controller/session.controllers";

const sessionRoutes = Router();

sessionRoutes.post("", createSessionController);

export default sessionRoutes;

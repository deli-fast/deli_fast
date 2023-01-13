import { Router } from "express";
import {
  createTypesController,
  deleteTypesController,
  listTypesController,
  updateTypesController,
} from "../controller/types/types.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const typesRoutes = Router();

typesRoutes.post("", ensureAuthMiddleware, ensureIsAdmMiddleware, createTypesController);
typesRoutes.get("", ensureAuthMiddleware, ensureIsAdmMiddleware, listTypesController);
typesRoutes.patch("/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, updateTypesController);
typesRoutes.delete("/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, deleteTypesController);

export default typesRoutes;

import { Router } from "express";
import {
  createTypesController,
  deleteTypesController,
  listTypesController,
  updateTypesController,
} from "../controller/types/types.controller";

const typesRoutes = Router();

typesRoutes.post("", createTypesController);
typesRoutes.get("", listTypesController);
typesRoutes.patch("/:id", updateTypesController);
typesRoutes.delete("/:id", deleteTypesController);

export default typesRoutes;

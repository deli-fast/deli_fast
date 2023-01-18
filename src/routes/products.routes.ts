import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  listProductsController,
  updateProductController,
} from "../controller/products.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const productRouter = Router();

productRouter.post("", ensureAuthMiddleware, ensureIsAdmMiddleware, createProductController);
productRouter.get("", ensureAuthMiddleware, ensureIsAdmMiddleware, listProductsController);
productRouter.patch("/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, updateProductController);
productRouter.delete("/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, deleteProductController);

export default productRouter;

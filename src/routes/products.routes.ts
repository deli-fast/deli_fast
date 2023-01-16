import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  listProductsController,
  updateProductController,
} from "../controller/products.controller";

const productRouter = Router();

productRouter.post("", createProductController);
productRouter.get("", listProductsController);
productRouter.patch("/:id", updateProductController);
productRouter.delete("/:id", deleteProductController);

export default productRouter;

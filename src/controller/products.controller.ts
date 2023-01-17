import { Request, Response } from "express";
import { IProductRequest } from "../interfaces/product";
import createProductService from "../services/products/createProduct.service";
import deleteProductService from "../services/products/deleteProduct.service";
import listProductsService from "../services/products/listProducts.service";
import updateProductService from "../services/products/updateProduct.service";

const createProductController = async (req: Request, res: Response) => {
  const { name, stock, type }: IProductRequest = req.body;
  const product = await createProductService({ name, stock, type });

  return res.status(201).json(product);
};

const listProductsController = async (req: Request, res: Response) => {
  const products = await listProductsService();

  return res.status(200).json(products);
};

const updateProductController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, stock, type }: IProductRequest = req.body;
  const product = await updateProductService(Number(id), { name, stock, type });

  return res.status(200).json(product);
};

const deleteProductController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await deleteProductService(Number(id));

  return res.status(204).json(product);
};

export {
  createProductController,
  listProductsController,
  updateProductController,
  deleteProductController,
};

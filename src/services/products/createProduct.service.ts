import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/errors";
import { IProduct, IProductRequest } from "../../interfaces/product";

const createProductService = async ({ name, stock, type }: IProductRequest): Promise<IProduct> => {
  const productExist = await AppDataSource.createQueryBuilder()
    .select("products")
    .from(Product, "products")
    .where("name = :name_product", { name_product: name })
    .getExists();

  if (productExist) {
    throw new AppError("The product already registered", 400);
  }

  const newProduct = await AppDataSource.createQueryBuilder()
    .insert()
    .into(Product)
    .values([{ name, stock, type }])
    .returning("*")
    .execute();

  return newProduct.raw[0];
};

export default createProductService;

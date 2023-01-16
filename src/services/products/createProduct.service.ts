import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/errors";

const createProductService = async ({ id, name, stock, typeId }) => {
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
    .values([{ name, stock }])
    .returning("*")
    .execute();

  return newProduct.raw[0];
};

export default createProductService;

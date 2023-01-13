import AppDataSource from "../data-source";
import { Product } from "../entities/product.entity";

const listProductsService = async () => {
  const products = await AppDataSource.createQueryBuilder()
    .select("products")
    .from(Product, "products")
    .getMany();

  return products;
};

export default listProductsService;

import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import { IProduct } from "../../interfaces/product";

const listProductsService = async (): Promise<IProduct[]> => {
  const products = await AppDataSource.createQueryBuilder()
    .select("products")
    .from(Product, "products")
    .getMany();

  return products;
};

export default listProductsService;

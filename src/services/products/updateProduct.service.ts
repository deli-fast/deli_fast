import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import { IProduct, IProductRequest } from "../../interfaces/product";

const updateProductService = async (
  id: number,
  { name, stock, type }: IProductRequest
): Promise<IProduct> => {
  const product = await AppDataSource.createQueryBuilder()
    .from(Product, "products")
    .update()
    .set({ name, stock, type })
    .where("id = :id_product", { id_product: id })
    .returning("*")
    .execute();

  return product.raw[0];
};

export default updateProductService;

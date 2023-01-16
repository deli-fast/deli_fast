import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";

const updateProductService = async (id, { name, stock, typeId }) => {
  const product = await AppDataSource.createQueryBuilder()
    .from(Product, "products")
    .update()
    .set({ name, stock })
    .where("id = :id_product", { id_product: id })
    .returning("*")
    .execute();

  return product.raw[0];
};

export default updateProductService;

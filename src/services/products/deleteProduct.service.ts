import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";

const deleteProductService = async (id:number) => {
  await AppDataSource.createQueryBuilder()
    .delete()
    .from(Product)
    .where("id = :id_product", { id_product: id })
    .returning("*")
    .execute();

    return {};
};

export default deleteProductService;

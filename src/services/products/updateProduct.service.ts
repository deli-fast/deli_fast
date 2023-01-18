import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import { IProduct, IProductRequest } from "../../interfaces/product";

const updateProductService = async (
  id: number,
  { name, stock, type }: IProductRequest
): Promise<IProduct[]> => {
  const productRepo = await AppDataSource.getRepository(Product)

  const productUpdated = await AppDataSource.createQueryBuilder()
    .from(Product, "products")
    .update()
    .set({ name, stock, type })
    .where("id = :id_product", { id_product: id })
    .execute();

    const product = await productRepo.find({where : {id : productUpdated.raw.id}, relations : { type :  true}})

    return product;
};

export default updateProductService;

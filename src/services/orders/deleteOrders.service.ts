import AppDataSource from "../../data-source";
import { Order } from "../../entities/order.entity";
import { AppError } from "../../errors/errors";




const deleteOrdersService = async (idOrder:number, typeUser:string, idUser:string) => {


    const order = AppDataSource.getRepository(Order);


    const orderExist = await order.createQueryBuilder("orders")
    .innerJoinAndSelect("orders.user", "user")
    .where("orders.id = :id_orders", {id_orders: idOrder })
    .select(["orders", "user.id"])
    .getOne()


    if(!orderExist){
        throw new AppError("Orders not exist", 404)
    }

    if(orderExist.user.id !== idUser && typeUser !== "admin"){
        throw new AppError("You don't have permission to access this field", 400)
    }

    await order.softRemove(orderExist);


};
  
export default deleteOrdersService
  
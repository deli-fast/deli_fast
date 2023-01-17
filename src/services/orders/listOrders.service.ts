
import AppDataSource from "../../data-source";
import { Order } from "../../entities/order.entity";
import { ordersSerializerResponse } from "../../serializers/orders.serializer";
import { AppError } from "../../errors/errors";
import { IOrdersResponse } from "../../interfaces/order";




const listOrdersService = async (idOrder:number, idUser:string, typeUser:string):Promise< IOrdersResponse> => {

    const order = AppDataSource.getRepository(Order);

    const joinOrder = await order.createQueryBuilder("orders")
    .innerJoinAndSelect("orders.user", "user")
    .where("orders.id = :id_orders", {id_orders: idOrder })
    .select(["orders","user.name", "user.id"])
    .getOne()
   

   
    if(!joinOrder){
        throw new AppError("Orders not exist", 404)
    }

    if(joinOrder.user.id !== idUser && typeUser !== "admin"){
        throw new AppError("You don't have permission to access this field", 400)
    }

   
  return  joinOrder


};
  
export default listOrdersService
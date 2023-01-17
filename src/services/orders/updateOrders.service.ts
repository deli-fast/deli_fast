import { Order } from "../../entities/order.entity";
import { EnumOrder, IOrders } from "../../interfaces/order";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/errors";
import { ordersSerializer} from "../../serializers/orders.serializer";




const updateOrdersService = async (data:IOrders, idOrder:number, typeUser:string, idUser:string) => {

    
    const order = AppDataSource.getRepository(Order);

    const orderExist = await order.createQueryBuilder("orders")
    .innerJoinAndSelect("orders.user", "user")
    .where("orders.id = :id_orders", {id_orders: idOrder })
    .getOne()

    if(!orderExist){
        throw new AppError("Orders not exist", 404)
    }

    if(orderExist.user.id !== idUser && typeUser !== "admin"){
        throw new AppError("You don't have permission to access this field", 400)
    }
   
    const filterOrder = await order.findOneBy({
        id:idOrder
    })

    const uptadeOrder =  order.create({
        ...filterOrder,
        date:data.date,
        value: data.value,
        status:EnumOrder.CONCLUIDO,
    })

    await order.save(uptadeOrder);

    const responseOrder = await ordersSerializer.validate(uptadeOrder, {
        stripUnknown:true
    })

    return responseOrder

  
};
  
export default updateOrdersService
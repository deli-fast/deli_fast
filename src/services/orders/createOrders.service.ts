import { EnumOrder, IOrders, IOrdersResponse } from "../../interfaces/order";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Order } from "../../entities/order.entity";
import { ordersSerializerResponse } from "../../serializers/orders.serializer";




const createOrdersService = async (data:IOrders, idUser:string):Promise<IOrdersResponse> => {
    const {date, value, status} = data
    
  
    const user = AppDataSource.getRepository(User);
    const order = AppDataSource.getRepository(Order);

    const userExist = await user.findOneBy({
        id: idUser
    })

   
    const newOrder = order.create({
        date:date,
        value: value,
        status:EnumOrder.EMANDAMENTO,
        user: userExist
    })

    await order.save(newOrder);

    const responseOrder = await ordersSerializerResponse.validate(newOrder, {
        stripUnknown:true
    })


    return responseOrder;


};
  
export default createOrdersService
  
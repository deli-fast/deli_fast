
import AppDataSource from "../../data-source"
import { Order } from "../../entities/order.entity";
import { IOrdersResponse } from "../../interfaces/order";
import { listordersSerializerResponse, ordersSerializerResponse } from "../../serializers/orders.serializer";




const listAllOrdersService = async ():Promise<IOrdersResponse[]> => {
  
    const order = AppDataSource.getRepository(Order);

    const allOrders = await order.find({
        relations:{
            user:true
        }
    });



    const responseOrders = await listordersSerializerResponse.validate(allOrders, {
        stripUnknown:true
    })



    return responseOrders
    

};
  
export default listAllOrdersService
  
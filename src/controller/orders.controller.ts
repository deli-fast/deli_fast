import { Request, Response } from "express";
import createOrdersService from "../services/orders/createOrders.service";
import deleteOrdersService from "../services/orders/deleteOrders.service";
import listAllOrdersService from "../services/orders/listAllOrders.service";
import listOrdersService from "../services/orders/listOrders.service";
import updateOrdersService from "../services/orders/updateOrders.service";


const createOrdersController = async (req: Request, res: Response) => {
  
    const result = await createOrdersService(req.body);
  
    return res.status(201).json(result);
};

const listAllOrdersController = async (req: Request, res: Response) => {
  
    const result = await listAllOrdersService();
  
    return res.status(200).json(result);
  };

const listOrdersController = async (req: Request, res: Response) => {
  
    const result = await listOrdersService(req.params.id);
  
    return res.status(200).json(result);
  };

  const updateOrdersController = async (req: Request, res: Response) => {
  
    const result = await updateOrdersService(req.params.id);
  
    return res.status(200).json(result);
  };

  const deleteOrdersController = async (req: Request, res: Response) => {
  
    const result = await deleteOrdersService(req.params.id);
  
    return res.status(204).json(result);
  };


export { 
    createOrdersController, deleteOrdersController, listAllOrdersController, listOrdersController, updateOrdersController
}
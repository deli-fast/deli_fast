import { Router } from "express";
import { createOrdersController, deleteOrdersController, listAllOrdersController, listOrdersController, updateOrdersController } from "../controller/orders.controller";


const ordersRouter = Router();

ordersRouter.post("", createOrdersController);
ordersRouter.get("", listAllOrdersController);
ordersRouter.get("/:id", listOrdersController);
ordersRouter.patch("/:id", updateOrdersController);
ordersRouter.delete("/:id", deleteOrdersController);

export default ordersRouter;
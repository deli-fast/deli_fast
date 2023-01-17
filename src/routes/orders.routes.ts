import { Router } from "express";
import { createOrdersController, deleteOrdersController, listAllOrdersController, listOrdersController, updateOrdersController } from "../controller/orders.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware.ts";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import { ordersSerializer } from "../serializers/orders.serializer";


const ordersRouter = Router();

ordersRouter.post("", ensureDataIsValidMiddleware(ordersSerializer), ensureAuthMiddleware, createOrdersController);
ordersRouter.get("", ensureAuthMiddleware, ensureIsAdmMiddleware, listAllOrdersController);
ordersRouter.get("/:id", ensureAuthMiddleware, listOrdersController);
ordersRouter.patch("/:id", ensureAuthMiddleware, updateOrdersController);
ordersRouter.delete("/:id",ensureAuthMiddleware, deleteOrdersController);

export default ordersRouter;
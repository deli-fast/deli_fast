import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRouter from "./routes/users.routes";
import { errorHandle } from "./errors/errors";
import productRouter from "./routes/products.routes";
import typesRoutes from "./routes/types.routes";
import sessionRoutes from "./routes/session.routes";
import ordersRouter from "./routes/orders.routes";


const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/login", sessionRoutes);
app.use("/types", typesRoutes);
app.use("/orders", ordersRouter);

app.use(errorHandle);


export default app;

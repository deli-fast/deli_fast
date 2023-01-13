import "reflect-metadata";
import express from "express";
import "express-async-errors";
import productRouter from "./routes/products.routes";
import typesRoutes from "./routes/types.routes";
import sessionRoutes from "./routes/session.routes";


const app = express();
app.use(express.json());

app.use("/products", productRouter);
app.use("/login", sessionRoutes);
app.use("/types", typesRoutes);


export default app;

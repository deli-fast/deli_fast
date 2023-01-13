import "reflect-metadata";
import express from "express";
import "express-async-errors";
import productRouter from "./routes/products.routes";

const app = express();
app.use(express.json());

app.use("/products", productRouter);

export default app;

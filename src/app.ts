import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRouter from "./routes/users.routes";
import { errorHandle } from "./errors/errors";
import typesRoutes from "./routes/types.routes";

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use(errorHandle);

export default app;

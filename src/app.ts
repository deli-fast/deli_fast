import "reflect-metadata";
import express from "express";
import "express-async-errors";
import sessionRoutes from "./routes/session.routes";

const app = express();
app.use(express.json());
app.use("/login", sessionRoutes);

export default app;

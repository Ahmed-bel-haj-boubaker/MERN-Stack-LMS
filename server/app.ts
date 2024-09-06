import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import authRouter from "./routes/auth.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
//body parser

app.use(express.json({ limit: "50mb" }));

//cookie parser

app.use(cookieParser());

//cors ==> cross origin ressource sharing

app.use(cors({ origin: process.env.ORIGIN }));

app.use("/api/v1", authRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", orderRouter);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);

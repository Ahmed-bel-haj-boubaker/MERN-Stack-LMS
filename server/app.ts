import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import authRouter from "./modules/auth/auth.route";
import notificationRouter from "./modules/notification/notification.route";
import layoutRouter from "./modules/layout/layout.route";
import categoriesRouter from "./modules/categories/categories.route";
import courseRouter from "./modules/video-course/course.route";
import orderRouter from "./modules/order/order.route";
import analyticsRouter from "./modules/analytics/analytics.route";
import adminCourseRouter from "./modules/admin-course/admin-course.route";
import planRouter from "./modules/SubscriptionPlan/plan.route";
import chatRouter from "./modules/chat/chat.route";

//body parser

app.use(express.json({ limit: "50mb" }));

//cookie parser

app.use(cookieParser());

//cors ==> cross origin ressource sharing

const allowedOrigins = process.env.ORIGIN?.split(",") || [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  "/api/v1",
  authRouter,
  courseRouter,
  orderRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter,
  categoriesRouter,
  adminCourseRouter,
  planRouter,
  chatRouter
);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);

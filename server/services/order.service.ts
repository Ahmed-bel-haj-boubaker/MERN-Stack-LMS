import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";

import OrderModel from "../models/order.model";

export const newOrder = CatchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    try {
      const order = await OrderModel.create(data);
      console.log(order);
      res.status(201).json({
        success: true,
        order,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

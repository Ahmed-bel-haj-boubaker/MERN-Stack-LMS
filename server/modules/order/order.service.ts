import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import OrderModel from "./order.model";

export const newOrder = CatchAsyncError(
  async (
    data: { courseIds: string[]; userId: string; payment_info: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const order = await OrderModel.create(data);

      res.status(201).json({
        success: true,
        order,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

//Get All orders

export const getAllOrdersService = async (res: Response) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    orders,
  });
};

import { Request, Response, NextFunction } from "express";
 
import cron from "node-cron";
import NotificationModel from "./notification.model";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/ErrorHandler";
//only for admin
export const getNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(200).json({ success: true, notifications });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
//only for admin
export const updateNotificationsStatus = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      } else {
        notification?.status
          ? (notification.status = "read")
          : notification?.status;

        await notification?.save();
      }

      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(201).json({ success: true, notifications });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

cron.schedule("0 0 0 * * *", async () => {
  console.log("Delete");
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  NotificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
});

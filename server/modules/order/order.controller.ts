import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/ErrorHandler";
import { IOrder } from "./order.model";
import userModel from "../auth/user.model";
import CourseModel from "../video-course/course.model";
import NotificationModel from "../notification/notification.model";
import path from "path";
import ejs from "ejs";
import sendEmail from "../../utils/sendEmail";
import { getAllOrdersService, newOrder } from "./order.service";

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseIds, payment_info } = req.body as {
        courseIds: string[];
        payment_info: any;
      };

      // Validate input
      if (!courseIds || courseIds.length === 0) {
        return next(new ErrorHandler("No courses selected for purchase.", 400));
      }

      const user = await userModel.findById(req.user?._id);
      if (!user) {
        return next(new ErrorHandler("User not found.", 404));
      }

      const purchasedCourses: string[] = [];
      const newCourses: any[] = [];
      const notifications: any[] = [];
      let totalPrice = 0;

      for (const courseId of courseIds) {
        // Check if the course is already purchased by the user
        const courseExistInUser = user.courses.some(
          (course: any) => course._id.toString() === courseId
        );

        if (courseExistInUser) {
          purchasedCourses.push(courseId);
          continue;
        }

        // Fetch course details
        const course = await CourseModel.findById(courseId);
        if (!course) {
          return next(new ErrorHandler(`Course not found: ${courseId}`, 404));
        }

        // Update total price and add to new courses
        newCourses.push(course);
        totalPrice += course.price;

        // Update course purchase count
        course.purchased = (course.purchased || 0) + 1;
        await course.save();

        // Prepare notification for the user
        notifications.push({
          user: user._id,
          title: "New Order",
          message: `You have a new order for ${course.name}.`,
        });
      }

      if (newCourses.length === 0) {
        return next(
          new ErrorHandler(
            "All selected courses have already been purchased.",
            400
          )
        );
      }

      // Update the user's purchased courses
      user.courses.push(...newCourses.map((course) => course._id));
      await user.save();

      // Bulk insert notifications
      await NotificationModel.insertMany(notifications);

      // Prepare order confirmation email data
      const emailData = newCourses.map((course) => ({
        _id: course._id.toString().slice(0, 6),
        name: course.name,
        price: course.price,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }));

      // Render email template
      const html = await ejs.renderFile(
        path.join(__dirname, "../../mails/order-confirmation.ejs"),
        { orders: emailData, totalPrice }
      );

      // Send email to the user
      await sendEmail({
        email: user.email,
        subject: "Order Confirmation",
        template: "order-confirmation.ejs",
        data: { orders: emailData, totalPrice },
      });
      console.log("newCourses", newCourses);
      // Prepare order data for saving
      const orderData = {
        courseIds: newCourses.map((course) => course._id.toString()),
        userId: user._id.toString(),
        payment_info,
      };
      console.log(orderData);

      // Create the order
      await newOrder(orderData, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getAllOrdersAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

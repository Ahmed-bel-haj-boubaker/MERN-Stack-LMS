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
import { redis } from "../../utils/redis";

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseIds, payment_info } = req.body as {
        courseIds: string[];
        payment_info: any;
      };

      if (!courseIds || courseIds.length === 0) {
        return next(new ErrorHandler("No courses selected for purchase.", 400));
      }

      const userId = req.user?._id;
      const user = await userModel.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found.", 404));
      }

      const newCourses: any[] = [];
      const notifications: any[] = [];
      let totalPrice = 0;

      for (const courseId of courseIds) {
        const course = await CourseModel.findById(courseId);
        if (!course) {
          return next(new ErrorHandler(`Course not found: ${courseId}`, 404));
        }

        // Check if the user is already enrolled in the course
        const userExistInCourse = course.students.includes(userId);
        if (!userExistInCourse) {
          newCourses.push(course);

          for (const course of newCourses) {
            course.courseData = course.courseData.map((courseItem: any) => {
              courseItem.preview = true;
              return courseItem;
            });

            course.markModified("courseData");
          }

          totalPrice += course.price;
          course.purchased = (course.purchased || 0) + 1;

          course.students.push(userId);
          await course.save();
          notifications.push({
            user: user._id,
            title: "New Order",
            message: `You have a new order for ${course.name}.`,
          });
          user.courses.push({
            courseId: course._id, // Add course ID, not entire course object
            progress: 0,
            status: "enrolled",
          });
          await user.save();
          await redis.set(userId, JSON.stringify(user)); // Update Redis cache
        }
      }

      // If no new courses were added, return an error
      if (newCourses.length === 0) {
        return next(
          new ErrorHandler(
            "All selected courses have already been purchased.",
            400
          )
        );
      }

      await NotificationModel.insertMany(notifications);

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

      const html = await ejs.renderFile(
        path.join(__dirname, "../../mails/order-confirmation.ejs"),
        { orders: emailData, totalPrice }
      );

      await sendEmail({
        email: user.email,
        subject: "Order Confirmation",
        template: "order-confirmation.ejs",
        data: { orders: emailData, totalPrice },
      });

      const orderData = {
        courseIds: newCourses.map((course) => course._id.toString()),
        userId: user._id.toString(),
        payment_info,
      };

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

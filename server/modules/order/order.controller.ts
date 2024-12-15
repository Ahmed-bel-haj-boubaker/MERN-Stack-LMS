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

        const userExistInCourse = course.students.includes(userId);
        if (!userExistInCourse) {
          const clonedCourse = JSON.parse(JSON.stringify(course));
          clonedCourse.courseData = clonedCourse.courseData.map(
            (courseItem: any) => {
              courseItem.preview = true;
              return courseItem;
            }
          );

          newCourses.push(clonedCourse);

          totalPrice += course.price;
          course.students.push(userId);

          notifications.push({
            user: user._id,
            title: "New Order",
            message: `You have a new order for ${course.name}.`,
          });
          console.log(clonedCourse);
          user.courses.push({
            courseId: clonedCourse,
            progress: 0,
            status: "enrolled",
          });

          // Update instructor's earnings and purchasedBy array
          const instructor = await userModel.findById(course.instructor);
          if (instructor) {
            instructor.totalEarning += totalPrice;

            const courseInInstructor = instructor.instructorCourses.find(
              (e) => e.course.toString() === courseId
            );
            if (courseInInstructor) {
              if (!courseInInstructor.purchasedBy.includes(userId.toString())) {
                courseInInstructor.purchasedBy.push(userId);
              }
            }

            await instructor.save();
            await redis.set(instructor._id, JSON.stringify(user));
          }

          await user.save();
          await course.save(); // Save the original course after updating its students
        }
      }

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

import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/ErrorHandler";
import AdminCourse from "./admin-course.model";
import userModel from "../auth/user.model";

export const createAdminCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userModel.findById(req.user?._id);
    try {
      const {
        courseName,
        courseDescription,
        category,
        contentType,
        courseLevel,
        isPublished,
        chapters,
        completionXP,
      } = req.body;

      if (!courseName || !courseDescription || !category || !courseLevel) {
        return next(new ErrorHandler("Missing required fields", 400));
      }
      const instructor = user?._id;
      console.log(instructor);

      const newCourse = new AdminCourse({
        courseName,
        courseDescription,
        category,
        contentType,
        courseLevel,
        isPublished,
        instructor,
        chapters,
        completionXP,
      });

      const savedCourse = await newCourse.save();

      res.status(201).json({
        success: true,
        message: "Course created successfully",
        course: savedCourse,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

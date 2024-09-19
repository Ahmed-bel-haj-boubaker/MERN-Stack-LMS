import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/ErrorHandler";
import AdminCourse from "./admin-course.model";
import userModel from "../auth/user.model";
import cloudinary from "cloudinary";

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
        thumbnail, // This should be included in the destructuring
      } = req.body;

      if (!courseName || !courseDescription || !category || !courseLevel) {
        return next(new ErrorHandler("Missing required fields", 400));
      }

      let thumbnailData = null;

      // Only upload to Cloudinary if thumbnail is provided
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "admin_courses", // Make sure folder names are consistent and formatted correctly
        });
        thumbnailData = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const newCourse = new AdminCourse({
        courseName,
        courseDescription,
        category,
        contentType,
        courseLevel,
        isPublished,
        instructor: user?._id,
        chapters,
        completionXP,
        thumbnail: thumbnailData,
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

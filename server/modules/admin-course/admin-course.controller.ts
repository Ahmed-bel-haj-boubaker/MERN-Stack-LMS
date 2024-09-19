import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/ErrorHandler";
import AdminCourse from "./admin-course.model";
import userModel from "../auth/user.model";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

// Cloudinary configuration (make sure this is set somewhere in your application)
cloudinary.v2.config({
  cloud_name: "your-cloud-name",
  api_key: "your-api-key",
  api_secret: "your-api-secret",
});

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
        thumbnail,
      } = req.body;

      if (!courseName || !courseDescription || !category || !courseLevel) {
        return next(new ErrorHandler("Missing required fields", 400));
      }

      let thumbnailData = null;

      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "admin_courses",
        });
        thumbnailData = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const updatedChapters = await Promise.all(
        chapters.map(async (chapter: any) => {
          let chapterImages = chapter.images;
          if (chapterImages && chapterImages.length > 0) {
            chapterImages = await Promise.all(
              chapterImages.map(async (image: string) => {
                const cloudImage = await cloudinary.v2.uploader.upload(image, {
                  folder: "admin_courses/chapter_images",
                });
                return {
                  public_id: cloudImage.public_id,
                  url: cloudImage.secure_url,
                };
              })
            );
          }
          return {
            ...chapter,
            images: chapterImages,
          };
        })
      );

      const newCourse = new AdminCourse({
        courseName,
        courseDescription,
        category,
        contentType,
        courseLevel,
        isPublished,
        instructor: user?._id,
        chapters: updatedChapters,
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

export const updateAdminCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        courseId,
        courseName,
        courseDescription,
        category,
        contentType,
        courseLevel,
        isPublished,
        chapters,
        completionXP,
        thumbnail,
      } = req.body;

      if (!courseId) {
        return next(new ErrorHandler("Course ID is required", 400));
      }

      const course = await AdminCourse.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      let updatedThumbnail = course.thumbnail;
      if (thumbnail) {
        if (course.thumbnail?.public_id) {
          await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);
        }
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "admin_courses",
        });
        updatedThumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const updatedChapters = await Promise.all(
        chapters.map(async (chapter: any) => {
          // Convert chapter._id to ObjectId for comparison
          const chapterId = new mongoose.Types.ObjectId(chapter._id);

          // Find the existing chapter
          const existingChapter = course.chapters.find((ch) =>
            ch._id.equals(chapterId)
          );

          console.log("Incoming Chapter ID:", chapter._id);
          console.log(
            "Existing Chapter ID:",
            existingChapter ? existingChapter._id.toString() : "Not Found"
          );
          console.log("Existing Chapter:", existingChapter);

          if (!existingChapter) {
            return chapter; // Handle or skip missing chapters
          }

          if (existingChapter.images && existingChapter.images.length > 0) {
            const oldImagePublicIds = existingChapter.images.map(
              (img: any) => img.public_id
            );

            await Promise.all(
              oldImagePublicIds.map((publicId: string) =>
                cloudinary.v2.uploader.destroy(publicId)
              )
            );
          }

          let chapterImages = [];
          if (chapter.images && chapter.images.length > 0) {
            chapterImages = await Promise.all(
              chapter.images.map(async (image: string) => {
                if (typeof image === "string") {
                  const cloudImage = await cloudinary.v2.uploader.upload(
                    image,
                    {
                      folder: "admin_courses/chapter_images",
                    }
                  );
                  return {
                    public_id: cloudImage.public_id,
                    url: cloudImage.secure_url,
                  };
                } else {
                  throw new Error("Invalid image format");
                }
              })
            );
          }

          return {
            _id: chapter._id,
            title: chapter.title,
            content: chapter.content,
            images: chapterImages,
            quiz: chapter.quiz,
          };
        })
      );

      const updatedCourse = await AdminCourse.findByIdAndUpdate(
        courseId,
        {
          courseName,
          courseDescription,
          category,
          contentType,
          courseLevel,
          isPublished,
          chapters: updatedChapters,
          completionXP,
          thumbnail: updatedThumbnail,
          updatedAt: new Date(),
        },
        { new: true }
      );

      if (!updatedCourse) {
        return next(new ErrorHandler("Failed to update course", 400));
      }

      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        course: updatedCourse,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/ErrorHandler";
import AdminCourse from "./admin-course.model";
import userModel from "../auth/user.model";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

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
        tags,
        students = [],
        enrollCount = 0,
        studentProgress = new Map<string, number>(),
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
        students,
        enrollCount,
        tags,
        studentProgress,
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
        tags,
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
          const chapterId = new mongoose.Types.ObjectId(chapter._id);
          const existingChapter = course.chapters.find((ch) =>
            ch._id.equals(chapterId)
          );

          if (!existingChapter) {
            return chapter;
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
          tags: tags || course.tags,
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

export const deleteAdminCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.courseId;
      const course = await AdminCourse.findById(courseId);
      if (course?.enrollCount === 0) {
        await AdminCourse.deleteOne({ _id: courseId });
        return res
          .status(200)
          .json({ success: true, message: "course is deleted successfully" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Course has students enrolled" });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//enroll admin course for those who purchased any plan

export const enrollAdminCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userModel
        .findById(req.user?._id)
        .populate("purchasedPlan")
        .lean();

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      const course = await AdminCourse.findById(req.params.courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      if (!user.purchasedPlan) {
        return next(new ErrorHandler("User has not purchased any plan", 400));
      }
      if (!course.students.includes(user._id as any)) {
        course.students.push(user._id as any);
        course.enrollCount += 1;
        await course.save();

        user.admincourses.push(course._id);
        await user.save();
      } else {
        return next(
          new ErrorHandler("User is already enrolled in this course", 400)
        );
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

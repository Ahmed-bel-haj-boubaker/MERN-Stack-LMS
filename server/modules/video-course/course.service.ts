import { Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import CourseModel from "./course.model";
import userModel from "../auth/user.model";
import { redis } from "../../utils/redis";

//createCourse
export const createCourse = CatchAsyncError(
  async (data: any, res: Response, req: Request) => {
    const course = await CourseModel.create(data);
    const instructorID = data.instructor;
    const instructor = await userModel.findById(instructorID);

    if (instructor) {
      instructor.instructorCourses.push({
        course: course?._id,
        purchasedBy: [],
      });
      await instructor.save();
      const user = instructor;
      await redis.set(instructorID, JSON.stringify(user));
    }
    await redis.set(course._id, JSON.stringify(course), "EX", 604800);

    res.status(201).json({ success: true, course });
  }
);

//Get All courses
export const getAllCoursesService = async (res: Response) => {
  const courses = await CourseModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    courses,
  });
};

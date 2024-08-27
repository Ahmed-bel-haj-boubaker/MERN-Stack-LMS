import { Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import CourseModel from "../models/course.model";

//createCourse

export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    console.log(data);
    const course = await CourseModel.create(data);
    res.status(201).json({ success: true, course });
  }
);

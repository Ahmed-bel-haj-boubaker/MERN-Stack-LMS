import mongoose, { Document, Model, Schema } from "mongoose";

interface IChapter {
  title: string;
  content: string;
  images: string[];
  quiz: mongoose.Schema.Types.ObjectId | null;
}

interface IAdminCourse extends Document {
  courseName: string;
  courseDescription: string;
  category: string;
  contentType: "text";
  courseLevel: "beginner" | "intermediate" | "advanced";
  isPublished: boolean;
  instructor: mongoose.Schema.Types.ObjectId;
  chapters: IChapter[];
  completionXP: number;
  createdAt: Date;
  updatedAt: Date;
  enrollCount: number;
  enrolledStudents: mongoose.Schema.Types.ObjectId[];
}

const AdminCourseSchema: Schema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseDescription: { type: String, required: true },
  category: { type: String, required: true },
  contentType: {
    type: String,
    enum: ["text"],
    required: true,
    default: "text",
  },
  courseLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  isPublished: { type: Boolean, default: false },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  enrollCount: { type: Number, default: 0 },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  chapters: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      images: [{ type: String }],
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        default: null,
      },
    },
  ],
  completionXP: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

AdminCourseSchema.pre<IAdminCourse>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const AdminCourse: Model<IAdminCourse> = mongoose.model<IAdminCourse>(
  "AdminCourse",
  AdminCourseSchema
);

export default AdminCourse;

import mongoose from "mongoose";

interface IStudentProgress {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  chapterProgress: {
    chapterId: mongoose.Types.ObjectId;
    completed: boolean;
  }[];
  overallProgress: number;
}

const studentProgressSchema = new mongoose.Schema<IStudentProgress>(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminCourse",
      required: true,
    },
    chapterProgress: [
      {
        chapterId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Chapter",
          required: true,
        },
        completed: { type: Boolean, default: false },
      },
    ],
    overallProgress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const StudentProgressModel = mongoose.model<IStudentProgress>(
  "StudentProgress",
  studentProgressSchema
);
export default StudentProgressModel;

import mongoose from "mongoose";

interface IImage {
  public_id: string;
  url: string;
}

interface IChapter {
  title: string;
  content: string;
  images: IImage[];
  quiz: mongoose.Types.ObjectId;
}

interface IAdminCourse {
  courseName: string;
  courseDescription: string;
  category: mongoose.Types.ObjectId;
  contentType: string;
  courseLevel: string;
  isPublished: boolean;
  instructor: mongoose.Types.ObjectId;
  chapters: IChapter[];
  completionXP: number;
  thumbnail?: IImage;
  students: mongoose.Types.ObjectId[];
  enrollCount: number;
  studentProgress?: Record<string, number>;
  tags: string[];
  isFeatured?: boolean;
}

const chapterSchema = new mongoose.Schema<IChapter>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
});

const adminCourseSchema = new mongoose.Schema<IAdminCourse>(
  {
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    contentType: { type: String, required: true },
    courseLevel: { type: String, required: true },
    isPublished: { type: Boolean, required: true },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chapters: [chapterSchema],
    completionXP: { type: Number, required: true },
    thumbnail: {
      public_id: { type: String },
      url: { type: String },
    },
    enrollCount: {
      type: Number,
      default: 0,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    tags: { type: [String], required: true },
    isFeatured: { type: Boolean, required: false },
    studentProgress: { type: Map, of: Number },
  },
  { timestamps: true }
);

export default mongoose.model<IAdminCourse>("AdminCourse", adminCourseSchema);

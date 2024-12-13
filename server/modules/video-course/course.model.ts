import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "../auth/user.model";
import { ICategories } from "../categories/categories.model";

interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies?: IComment[];
}

interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies?: IComment[];
}
interface ILink extends Document {
  title: string;
  url: string;
}
interface ICourseData extends Document {
  title: string;
  description: string;
  preview: boolean;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

interface ICourse extends Document {
  _id: string;
  category: ICategories;
  description: string;
  name: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
  instructor: IUser;
  students: IUser[];
}

const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: { type: Number, default: 0 },
  comment: String,
  commentReplies: [Object],
});

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});
const commentSchema = new Schema<IComment>({
  user: Object,
  question: String,
  questionReplies: [Object],
});

const courseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  videoLength: Number,
  title: String,
  preview: { type: Boolean, default: false, required: true },
  videoSection: String,
  description: String,
  links: [linkSchema],
  videoPlayer: String,
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: { type: Number },
    thumbnail: {
      public_id: { required: false, type: String },
      url: { required: false, type: String },
    },
    courseData: [courseDataSchema],
    tags: { required: true, type: String },
    level: { required: true, type: String },
    demoUrl: { required: true, type: String },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    ratings: { default: 0, type: Number },
    purchased: { default: 0, type: Number },
    reviews: [reviewSchema],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    students: [
      { type: mongoose.Schema.ObjectId, ref: "User", required: false },
    ],
  },
  { timestamps: true }
);

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
export default CourseModel;

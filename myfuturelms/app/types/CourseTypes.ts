import { ICourseDetails } from "../components/Curriculum";

export interface Course {
  _id: string;
  name: string;
  description: string;
  language: string;
  courses: Array<Course>;
  instructor: Instructor;
  category: Category;
  ratings: number;
  price: number;
  totalResults: number;
  createdAt: Date;
  courseData: ICourseDetails[];
  benefits: Ibenefits[];
  purchased: number;
  reviews: IReview[];
  level: string;
  estimatedPrice: number;
  prerequisites: Iprerequisites[];
  courseId: Course;
  progress: number;
  purchasedBy: string[];
}
export interface Iprerequisites {
  title: string;
}

export interface Ibenefits {
  title: string;
}
export interface Instructor {
  username: string;
  facebookLink: string;
  linkedinLink: string;
  instagramLink: string;
  reviews: Array<object>;
  job: string;
}

export interface Category {
  name: string;
}
export interface CoursesResponse {
  courses: Course;
}
export interface IReview {
  rating: number;
  user: {
    username: string;
    job: string;
  };
  comment: string;
}

export interface IReviews {
  reviews: IReview[];
  ratings: number;
}

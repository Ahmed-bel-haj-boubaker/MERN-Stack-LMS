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
  courseData: Array<string>;
  benefits: Array<string>;
}
export interface Instructor {
  username: string;
}

export interface Category {
  name: string;
}
export interface CoursesResponse {
  courses: Course;
}

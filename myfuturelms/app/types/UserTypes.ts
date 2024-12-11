import { Course } from "./CourseTypes";

export interface IUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: string;
  courses: Course[];
  facebookLink: string;
  instagram: string;
  linkedInLink: string;
  phoneNumber: string;
  biography: string;
  lastName: string;
  firstName: string;
  skills: string[];
  job: string;
  createdAt: string;
  accessToken: string;
}

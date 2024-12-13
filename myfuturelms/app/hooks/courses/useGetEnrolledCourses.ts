import apiClient from "@/app/Api/ApiClient";
import { useAppDispatch } from "@/app/redux/hooks";
import { addToPurchasedCourses } from "@/app/redux/purchasedCoursesSlice/purchasedSlice";
import { Course } from "@/app/types/CourseTypes";
import { useEffect, useState } from "react";
import useUserConnected from "../user/useUserConnected";

interface CourseEnrolledResponse {
  courses: Course[];
}
const useGetEnrolledCourses = (status: string) => {
  const dispatch = useAppDispatch();
  const { user } = useUserConnected();

  const [courses, setCourses] = useState<Course[]>([]);
  const fetchEnrolledCourse = async () => {
    const response = await apiClient.get<CourseEnrolledResponse>(
      `/get-student-courses/${status}`
    );

    setCourses(response.data.courses);
    response.data.courses.forEach((course) => {
      dispatch(addToPurchasedCourses(course));
    });
  };

  useEffect(() => {
    if (user?.role === "instructor" || user?.role === "admin") {
      fetchEnrolledCourse();
    }
  }, [status]);
  return { courses };
};

export default useGetEnrolledCourses;

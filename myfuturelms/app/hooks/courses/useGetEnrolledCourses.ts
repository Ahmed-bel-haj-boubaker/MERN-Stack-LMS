import apiClient from "@/app/Api/ApiClient";
import { Course } from "@/app/types/CourseTypes";
import { useEffect, useState } from "react";

interface CourseEnrolledResponse {
  courses: Course[];
}
const useGetEnrolledCourses = (status: string) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const fetchEnrolledCourse = async () => {
    const response = await apiClient.get<CourseEnrolledResponse>(
      `/get-student-courses/${status}`
    );

    setCourses(response.data.courses);
  };

  useEffect(() => {
    fetchEnrolledCourse();
  }, [status]);
  return { courses };
};

export default useGetEnrolledCourses;

"use client";

import apiClient from "@/app/Api/ApiClient";
import { Course } from "@/app/types/CourseTypes";
import { useEffect, useState } from "react";

interface IResponseCourses {
  courses: Course[];
}
const useGetInstructorCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
      const response = await apiClient.get<IResponseCourses>(
        "get-instructor-courses"
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return { courses };
};

export default useGetInstructorCourses;

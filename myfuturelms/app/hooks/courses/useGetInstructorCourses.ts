"use client";

import apiClient from "@/app/Api/ApiClient";
import { Course } from "@/app/types/CourseTypes";
import { IUser } from "@/app/types/UserTypes";
import { useEffect, useState } from "react";

const useGetInstructorCourses = () => {
  const [courses, setCourses] = useState<IUser[]>([]);

  const fetchCourses = async () => {
    try {
      const response = await apiClient.get<IUser[]>("get-instructor-courses");
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

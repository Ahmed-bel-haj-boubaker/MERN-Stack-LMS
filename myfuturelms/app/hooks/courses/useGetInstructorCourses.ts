"use client";
import Api from "@/app/Api's";
import { Course } from "@/app/types/CourseTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import useUserConnected from "../user/useUserConnected";
import { useAccessToken } from "../user/useAccessToken";
import { useAuth } from "@/app/(auth)/provider/AuthContext";

const useGetInstructorCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/get-instructor-courses`,
        {
          withCredentials: true,
        }
      );
      setCourses(response.data.courses);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  console.log(courses);
  return { courses };
};

export default useGetInstructorCourses;

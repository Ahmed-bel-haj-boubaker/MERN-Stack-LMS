/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "@/app/Api's";
import apiClient from "@/app/Api/ApiClient";
import { Course } from "@/app/types/CourseTypes";
import { useState, useEffect } from "react";

const useGetByIdCourse = (id: string | null) => {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        try {
          const response = await apiClient.get<{ course: Course }>(
            `/get-course/${id}`
          );
          setCourse(response.data.course);
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      };

      fetchCourse();
    }
  }, [id]);

  return { course };
};

export default useGetByIdCourse;

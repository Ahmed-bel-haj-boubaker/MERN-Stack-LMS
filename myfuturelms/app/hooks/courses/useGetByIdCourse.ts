/* eslint-disable @typescript-eslint/no-explicit-any */
import Api from "@/app/Api's";
import { Course } from "@/app/types/CourseTypes";
import axios from "axios";
import { useState, useEffect } from "react";

const useGetByIdCourse = (id: string | null) => {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Only fetch if id is valid
    if (id) {
      const fetchCourse = async () => {
        try {
          const response = await axios.get<{ course: Course }>(
            `${Api.localhost}/get-course/${id}`
          );
          setCourse(response.data.course);
          console.log(response.data.course);
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

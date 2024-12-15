/* eslint-disable @typescript-eslint/no-explicit-any */

import apiClient from "@/app/Api/ApiClient";
import { useAppSelector } from "@/app/redux/hooks";
import { Course } from "@/app/types/CourseTypes";
import { useState, useEffect } from "react";

const useGetByIdCourse = (id: string | null) => {
  const [course, setCourse] = useState<Course | null>(null);
  const purchasedCourse = useAppSelector(
    (state) => state.purchasedCourse.purchasedArr
  );
  console.log(course);
  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        try {
          const response = await apiClient.get<{ course: Course }>(
            `/get-course/${id}`
          );
          const courseISPurchased = purchasedCourse.find(
            (course) => course.courseId._id === id
          );

          if (courseISPurchased) {
            setCourse(courseISPurchased.courseId);
          } else {
            setCourse(response.data.course);
          }
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

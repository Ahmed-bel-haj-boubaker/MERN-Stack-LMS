import Api from "@/app/Api's";
import axios from "axios";
import { useState, useEffect } from "react";

const useGetByIdCourse = (id: string | null) => {
  const [course, setCourse] = useState<any | null>(null);

  useEffect(() => {
    // Only fetch if id is valid
    if (id) {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(`${Api.localhost}/get-course/${id}`);
          setCourse(response.data.course);
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      };

      fetchCourse();
    }
  }, [id]); // This effect runs when the `id` changes

  return { course };
};

export default useGetByIdCourse;

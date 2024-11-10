import Api from "@/app/Api's";
import { Course, CoursesResponse } from "@/app/types/CourseTypes";
import axios from "axios";
import { useEffect, useState } from "react";

const useCourse = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [pageCache, setPageCache] = useState<{ [key: number]: Course[] }>({});
  const itemsPerPage = 9;

  useEffect(() => {
    if (!pageCache[currentPage]) {
      fetchCourses(currentPage);
    } else {
      setCourses(pageCache[currentPage]);
    }
  }, [currentPage]);

  const fetchCourses = async (page: number) => {
    try {
      const response = await axios.get<CoursesResponse>(
        `${Api.localhost}/get-all-courses?page=${page}&limit=${itemsPerPage}`
      );

      const data = response.data.courses.courses;
      const totRes = response.data.courses.totalResults;

      setTotalCourses(totRes);
      setCourses(data);
      setPageCache((prevCache) => ({ ...prevCache, [page]: data }));
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };
  return {courses,totalCourses,currentPage,pageCache,setCurrentPage,itemsPerPage};
};

export default useCourse;

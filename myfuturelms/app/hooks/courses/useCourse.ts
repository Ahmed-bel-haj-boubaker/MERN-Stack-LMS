import Api from "@/app/Api's";
import {
  setCourses,
  setTotalCourses,
} from "../../redux/courseSlices/courseSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { Course, CoursesResponse } from "@/app/types/CourseTypes";
import axios from "axios";
import { useEffect, useState } from "react";

const useCourse = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCache, setPageCache] = useState<{ [key: number]: Course[] }>({});
  const itemsPerPage = 9;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!pageCache[currentPage]) {
      fetchCourses(currentPage);
    } else {
      dispatch(setCourses(pageCache[currentPage]));
    }
  }, [currentPage]);

  const fetchCourses = async (page: number) => {
    try {
      const response = await axios.get<CoursesResponse>(
        `${Api.localhost}/get-all-courses?page=${page}&limit=${itemsPerPage}`
      );

      const data = response.data.courses.courses;
      const totRes = response.data.courses.totalResults;

      dispatch(setCourses(data));
      dispatch(setTotalCourses(totRes));
      setPageCache((prevCache) => ({ ...prevCache, [page]: data }));
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  return { currentPage, setCurrentPage, itemsPerPage };
};

export default useCourse;

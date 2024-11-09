"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTh } from "@fortawesome/free-solid-svg-icons";
import Api from "../Api's";
import CoursesItems from "../Data";
import Pagination from "../components/Pagination";

interface Course {
  id: string;
  name: string;
  description: string;
  language: string;

  instructor: string;
  category: string;
  rating: number;
  price: number;
}

interface CoursesResponse {
  totalResults: number;
  courses: Course[];
}

const categories = [
  "Development",
  "Art & Design",
  "Business",
  "Data Science",
  "Finance",
  "Health & Fitness",
  "Lifestyle",
];
const languages = ["Arabic", "English", "Spanish"];
const prices = ["Free", "Paid"];

const FilterSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div className="mb-6">
    <h3 className="font-semibold text-lg mb-3">{title}</h3>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item}>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600 rounded-sm focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">{item}</span>
          </label>
        </li>
      ))}
    </ul>
    <button className="text-indigo-500 text-sm mt-2">Show More +</button>
  </div>
);

const CourseFilter: React.FC = () => (
  <aside className="w-full p-4 bg-white border-b md:border-b-0 md:border-r border-gray-200">
    <FilterSection title="Categories" items={categories} />
    <FilterSection title="Languages" items={languages} />
    <FilterSection title="Price" items={prices} />
  </aside>
);

const AllCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [pageCache, setPageCache] = useState<{ [key: number]: Course[] }>({});
  const itemsPerPage = 4;

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
      console.log("page ", page);
      const data = response.data.courses.courses;
      const totRes = response.data.courses.totalResults;
      console.log(data);
      setTotalCourses(totRes);
      setCourses(data.courses);
      setPageCache((prevCache) => ({ ...prevCache, [page]: data.courses }));
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-7">
      <div className="w-full md:w-64">
        <CourseFilter />
      </div>
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <span className="text-gray-700">
            Showing of {totalCourses} Results
          </span>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className="text-gray-700">Sort By:</span>
            <select className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-indigo-500">
              <option>Default Sort</option>
            </select>
            <div className="flex space-x-2">
              <button className="p-2 rounded border border-gray-300 hover:bg-gray-200">
                <FontAwesomeIcon icon={faTh} className="text-gray-600" />
              </button>
              <button className="p-2 rounded border border-gray-300 hover:bg-gray-200">
                <FontAwesomeIcon icon={faList} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {courses?.map((courseItem, index) => (
            <div key={index} className="rounded p-4">
              {courseItem.name}
              {/* <CourseCard
                courseName={courseItem.courseName}
                instructor={courseItem.instructor}
                category={courseItem.category}
                rating={courseItem.rating}
                price={courseItem.price}
              />  
            </div>
          ))} */}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(totalCourses / itemsPerPage)}
        />
      </div>
    </div>
  );
};

export default AllCourses;

"use client";
import React from "react";

import CourseCard from "../components/CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTh } from "@fortawesome/free-solid-svg-icons";

import Pagination from "../components/Pagination";
import useCourse from "../hooks/courses/useCourse";
import useCategory from "../hooks/category/useCategory";
import { ICategory } from "../types/CategoryTypes";
import { useAppSelector } from "../redux/hooks";

const languages = ["Arabic", "English", "Spanish"];
const prices = ["Free", "Paid"];

const FilterSection = ({
  title,
  items,
}: {
  title: string;
  items: ICategory[];
}) => (
  <div className="mb-6">
    <h3 className="font-semibold text-lg mb-3">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index}>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600 rounded-sm focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">{item.name}</span>
          </label>
        </li>
      ))}
    </ul>
    <button className="text-indigo-500 text-sm mt-2">Show More +</button>
  </div>
);

const CourseFilter: React.FC = () => {
  const { categories } = useCategory();
  return (
    <aside className="w-full p-4 bg-white border-b md:border-b-0 md:border-r border-gray-200">
      <FilterSection title="Categories" items={categories} />
      {/* <FilterSection title="Languages" items={languages} />
      <FilterSection title="Price" items={prices} /> */}
    </aside>
  );
};

const AllCourses = () => {
  const { currentPage, setCurrentPage, itemsPerPage } = useCourse();
  const courses = useAppSelector((state) => state.courses.courses);
  const totalCourses = useAppSelector((state) => state.courses.totalCourses);
  console.log(courses);
  return (
    <div className="flex flex-col md:flex-row gap-6 mt-7">
      <div className="w-full md:w-64">
        <CourseFilter />
      </div>
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <span className="text-gray-700">
            Showing {itemsPerPage} of {totalCourses} Results
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
          {courses?.map((courseItem, index) => (
            <div key={index} className="rounded p-4">
              <CourseCard
                id={courseItem._id}
                courseName={courseItem.name}
                instructor={courseItem.instructor.username}
                category={courseItem.category.name}
                rating={courseItem.ratings}
                price={courseItem.price}
              />
            </div>
          ))}
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

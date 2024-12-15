"use client";

import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import useGetInstructorCourses from "../../hooks/courses/useGetInstructorCourses";

const CoursesListInstructor = () => {
  const { courses } = useGetInstructorCourses();
  console.log(courses);

  return (
    <div className="bg-white p-6 rounded-lg border">
      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto hidden sm:table">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Course Name</th>
              <th className="py-2 px-4 text-left">Enrolled</th>
              <th className="py-2 px-4 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{course.name}</td>
                <td className="py-2 px-4">{course.purchased}</td>
                <td className="py-2 px-4 flex items-center">
                  {[...Array(5)].map((_, i) => {
                    if (i < Math.floor(course.ratings)) {
                      return <FaStar key={i} className="text-yellow-400" />;
                    } else if (i < course.ratings) {
                      return (
                        <FaStarHalfAlt key={i} className="text-yellow-400" />
                      );
                    } else {
                      return <FaRegStar key={i} className="text-gray-400" />;
                    }
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="sm:hidden">
          {courses?.map((course, index) => (
            <div key={index} className="bg-gray-50 p-4 mb-4 rounded-lg border">
              <div className="mb-2">
                <span className="font-bold">Course Name:</span> {course.name}
              </div>
              <div className="mb-2">
                <span className="font-bold">Enrolled:</span> {course.purchased}
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-2">Rating:</span>
                {[...Array(5)].map((_, i) => {
                  if (i < Math.floor(course.ratings)) {
                    return <FaStar key={i} className="text-yellow-400" />;
                  } else if (i < course.ratings) {
                    return (
                      <FaStarHalfAlt key={i} className="text-yellow-400" />
                    );
                  } else {
                    return <FaRegStar key={i} className="text-gray-400" />;
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <a href="#" className="text-blue-500 mt-4 block text-right">
        Browse All Courses →
      </a>
    </div>
  );
};

export default CoursesListInstructor;

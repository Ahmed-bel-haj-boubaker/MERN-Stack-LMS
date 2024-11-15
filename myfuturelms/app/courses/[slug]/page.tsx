"use client";

import useGetByIdCourse from "@/app/hooks/courses/useGetByIdCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import image from "../../../public/images/circle.png";
import { faStar, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import SideBar from "@/app/components/SideBar";

const CourseDetails = () => {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Always call the hook, even if the id is missing
  const { course } = useGetByIdCourse(id);
  console.log(course);
  // Handle missing or invalid ID
  if (!id) {
    return <div>Course ID is missing.</div>;
  }

  // Handle loading or no course found
  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start p-6  min-h-screen">
      {/* Main Content */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6 mb-6 lg:mb-0 lg:mr-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            Resolving Conflicts Between Designers And Engineers
          </h1>
          <span className="flex items-center text-yellow-500 font-medium">
            <FontAwesomeIcon icon={faStar} className="mr-1" />
            4.5 ★ Reviews
          </span>
        </div>

        <p className="mt-2 text-gray-500">
          By David Millar | 24/07/2024 | 2,250 Students
        </p>
        <Image
          src={image}
          alt="Course Thumbnail"
          width={500}
          height={300}
          className="mt-4 rounded-lg"
        />
      </div>

      <SideBar />
    </div>
  );
};

export default CourseDetails;

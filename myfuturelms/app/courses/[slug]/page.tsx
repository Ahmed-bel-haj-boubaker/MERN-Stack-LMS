"use client";

import useGetByIdCourse from "@/app/hooks/courses/useGetByIdCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SideBar from "@/app/components/SideBar";
import BannerCourse from "../../../public/images/bannercourse.jpg";
import Ticket from "@/app/components/Ticket";
const CourseDetails = () => {
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
    <div className="flex flex-col lg:flex-row justify-center items-start p-6  min-h-screen mt-24">
      {/* Main Content */}
      <div className=" flex-1  bg-white shadow-lg rounded-lg p-6 mb-6 lg:mb-0 lg:mr-6">
        <div className="flex flex-col-reverse ">
          <div className="mt-3 flex flex-col items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">
              Resolving Conflicts Between Designers And Engineers
            </h1>
            <div className="flex justify-center items-center text-yellow-500 font-medium">
              <p className="mt-2 text-gray-500">
                By David Millar | 24/07/2024 | 2,250 Students
              </p>
            </div>
          </div>
          <div>
            <Image
              src={BannerCourse}
              alt="Course Thumbnail"
              className="mt-4 rounded-lg"
            />
            <div className="flex justify-start items-center text-yellow-500 font-medium mt-6">
              <Ticket text="development" className="text-black" />
              <FontAwesomeIcon icon={faStar} className="mr-1" />( 4.5 Reviews)
            </div>
          </div>
        </div>
      </div>

      <SideBar />
    </div>
  );
};

export default CourseDetails;

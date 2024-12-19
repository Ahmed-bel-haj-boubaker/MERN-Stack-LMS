"use client";

import useGetByIdCourse from "@/app/hooks/courses/useGetByIdCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import SideBar from "@/app/components/SideBar";
import BannerCourse from "../../../public/images/bannercourse.jpg";
import Ticket from "@/app/components/Ticket";
import Avatar from "../../../public/images/avatar.png";
import Button from "@/app/components/Button";
import CourseDescription from "@/app/components/CourseDescription";
import { useState } from "react";
import InstructorsDetails from "@/app/components/InstructorsDetails";
import Reviews from "@/app/components/Reviews";
import Curriculum from "@/app/components/Curriculum";
const CourseDetails = () => {
  const [isOverviewVisible, setOverviewVisible] = useState(true);
  const [isCurriculumVisible, setCurriculumVisible] = useState(false);
  const [isInstructorsVisible, setInstructorsVisible] = useState(false);
  const [isReviewsVisible, setReviewsVisible] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { course } = useGetByIdCourse(id);
  console.log(course);
  const handleOverviewVisible = () => {
    setOverviewVisible(true);
    setCurriculumVisible(false);
    setInstructorsVisible(false);
    setReviewsVisible(false);
  };
  const handleCurriculumVisible = () => {
    setOverviewVisible(false);
    setCurriculumVisible(true);
    setInstructorsVisible(false);
    setReviewsVisible(false);
  };
  const handleInstructorsVisible = () => {
    setOverviewVisible(false);
    setCurriculumVisible(false);
    setInstructorsVisible(true);
    setReviewsVisible(false);
  };
  const handleReviewsVisible = () => {
    setOverviewVisible(false);
    setCurriculumVisible(false);
    setInstructorsVisible(false);
    setReviewsVisible(true);
  };

  if (!id) {
    return <div>Course ID is missing.</div>;
  }

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col lg:flex-row justify-center items-start  min-h-screen mt-24">
        <div className="flex-1  p-6 mb-6 lg:mb-0 lg:mr-6">
          <div className="flex flex-col-reverse">
            <div>
              <div className="mt-3 mb-3 flex flex-col">
                <h1 className="text-3xl font-bold text-gray-800">
                  {course.name}
                </h1>
              </div>
              <div className="flex items-center ">
                <Image src={Avatar} alt="instructor" className="size-10 mr-2" />
                By
                <span className=" ml-2 text-gray-500">
                  {course.instructor.username}
                </span>
                <div className="flex ml-4 gap-2 items-center text-gray-600">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5604 4.97272C18.5604 4.97272 11.5036 1.96687 11.5018 1.96608C11.0252 1.76745 10.5199 1.66675 10 1.66675C9.48008 1.66675 8.97484 1.76745 8.49824 1.96608C8.49637 1.96687 1.43961 4.97272 1.43961 4.97272C0.565 5.33862 0 6.18722 0 7.1355C0 8.08378 0.565 8.93237 1.43961 9.29827L3.125 10.0162V14.948C3.125 16.2403 4.17641 17.2917 5.46875 17.2917H14.5312C15.8236 17.2917 16.875 16.2403 16.875 14.948V12.8648C16.875 12.4333 16.5252 12.0835 16.0937 12.0835C15.6623 12.0835 15.3125 12.4333 15.3125 12.8648V14.948C15.3125 15.3788 14.962 15.7292 14.5312 15.7292H5.46875C5.03797 15.7292 4.6875 15.3788 4.6875 14.948V10.6817C4.6875 10.6817 8.49637 12.3042 8.49824 12.305C8.97484 12.5035 9.48008 12.6042 10 12.6042C10.5198 12.6042 11.0251 12.5035 11.5017 12.305C11.5036 12.3042 18.5604 9.29827 18.5604 9.29827C19.435 8.93237 20 8.08378 20 7.1355C20 6.18722 19.435 5.33862 18.5604 4.97272ZM17.9563 7.85726C17.9545 7.85804 10.8983 10.8636 10.8983 10.8636C10.6138 10.9818 10.3116 11.0417 9.99996 11.0417C9.68832 11.0417 9.38609 10.9818 9.10168 10.8637C8.40086 10.5651 2.04551 7.85804 2.04363 7.85726C1.75137 7.73542 1.5625 7.45214 1.5625 7.1355C1.5625 6.81886 1.75137 6.53558 2.04367 6.41374C2.04555 6.41296 9.10172 3.40733 9.10172 3.40733C9.38613 3.28917 9.68836 3.22925 10 3.22925C10.3116 3.22925 10.6139 3.28917 10.8983 3.40733C10.8983 3.40733 17.9545 6.41296 17.9563 6.41374C18.2486 6.53558 18.4375 6.81886 18.4375 7.1355C18.4375 7.45214 18.2486 7.73542 17.9563 7.85726Z"
                      fill="currentcolor"
                    ></path>
                    <path
                      d="M19.2187 10.7779C18.7873 10.7779 18.4375 11.1277 18.4375 11.5592V14.948C18.4375 15.3795 18.7873 15.7292 19.2187 15.7292C19.6502 15.7292 20 15.3795 20 14.948V11.5592C20 11.1277 19.6502 10.7779 19.2187 10.7779Z"
                      fill="currentcolor"
                    ></path>
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5604 4.97272C18.5604 4.97272 11.5036 1.96687 11.5018 1.96608C11.0252 1.76745 10.5199 1.66675 10 1.66675C9.48008 1.66675 8.97484 1.76745 8.49824 1.96608C8.49637 1.96687 1.43961 4.97272 1.43961 4.97272C0.565 5.33862 0 6.18722 0 7.1355C0 8.08378 0.565 8.93237 1.43961 9.29827L3.125 10.0162V14.948C3.125 16.2403 4.17641 17.2917 5.46875 17.2917H14.5312C15.8236 17.2917 16.875 16.2403 16.875 14.948V12.8648C16.875 12.4333 16.5252 12.0835 16.0937 12.0835C15.6623 12.0835 15.3125 12.4333 15.3125 12.8648V14.948C15.3125 15.3788 14.962 15.7292 14.5312 15.7292H5.46875C5.03797 15.7292 4.6875 15.3788 4.6875 14.948V10.6817C4.6875 10.6817 8.49637 12.3042 8.49824 12.305C8.97484 12.5035 9.48008 12.6042 10 12.6042C10.5198 12.6042 11.0251 12.5035 11.5017 12.305C11.5036 12.3042 18.5604 9.29827 18.5604 9.29827C19.435 8.93237 20 8.08378 20 7.1355C20 6.18722 19.435 5.33862 18.5604 4.97272ZM17.9563 7.85726C17.9545 7.85804 10.8983 10.8636 10.8983 10.8636C10.6138 10.9818 10.3116 11.0417 9.99996 11.0417C9.68832 11.0417 9.38609 10.9818 9.10168 10.8637C8.40086 10.5651 2.04551 7.85804 2.04363 7.85726C1.75137 7.73542 1.5625 7.45214 1.5625 7.1355C1.5625 6.81886 1.75137 6.53558 2.04367 6.41374C2.04555 6.41296 9.10172 3.40733 9.10172 3.40733C9.38613 3.28917 9.68836 3.22925 10 3.22925C10.3116 3.22925 10.6139 3.28917 10.8983 3.40733C10.8983 3.40733 17.9545 6.41296 17.9563 6.41374C18.2486 6.53558 18.4375 6.81886 18.4375 7.1355C18.4375 7.45214 18.2486 7.73542 17.9563 7.85726Z"
                        fill="currentcolor"
                      ></path>
                      <path
                        d="M19.2187 10.7779C18.7873 10.7779 18.4375 11.1277 18.4375 11.5592V14.948C18.4375 15.3795 18.7873 15.7292 19.2187 15.7292C19.6502 15.7292 20 15.3795 20 14.948V11.5592C20 11.1277 19.6502 10.7779 19.2187 10.7779Z"
                        fill="currentcolor"
                      ></path>
                    </svg>
                  </svg>
                  {course.purchased} students
                </div>
                <div className="flex ml-4 gap-2 items-center text-gray-600">
                  <FontAwesomeIcon icon={faCalendar} />
                  {new Date(course?.createdAt).toLocaleDateString("en-CA")}
                </div>
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
                <FontAwesomeIcon icon={faStar} className="mr-1" />(
                {course.ratings} Reviews)
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button text="Overview" onClicks={() => handleOverviewVisible()} />

            <Button
              text="Course Curriculum"
              onClicks={() => handleCurriculumVisible()}
            />
            <Button
              text="Instructors"
              onClicks={() => handleInstructorsVisible()}
            />
            <Button text="Reviews" onClicks={() => handleReviewsVisible()} />
          </div>
          {isOverviewVisible && (
            <div>
              <CourseDescription
                benefits={course.benefits}
                description={course.description}
                prerequisites={course.prerequisites}
              />
            </div>
          )}
          {isReviewsVisible && (
            <div>
              <Reviews reviews={course.reviews} ratings={course.ratings} />
            </div>
          )}
          {isInstructorsVisible && (
            <div>
              <InstructorsDetails
                instructorName={course.instructor.username}
                instructorJob={course.instructor.job}
                facebookUser={course.instructor.facebookLink}
                instagramUser={course.instructor.instagramLink}
                linkedinUser={course.instructor.linkedinLink}
              />
            </div>
          )}
          {isCurriculumVisible && (
            <div>
              <Curriculum
                description={course.description}
                courseData={course.courseData}
              />
            </div>
          )}
        </div>

        <SideBar
          lessons={course?.courseData.length}
          level={course?.level}
          participation={course.purchased}
          price={course.price}
          oldPrice={course.estimatedPrice}
        />
      </div>
    </div>
  );
};

export default CourseDetails;

"use client";
import Lottie from "lottie-react";
import React from "react";
import Avatar from "../../public/images/LottieIFiles/Atom.json";

const Banner: React.FC = () => {
  return (
    <div className="bg-[#f4f1f9] text-black font-sans px-6 py-12">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Banner content with Lottie animation and breadcrumb */}
        <div className="w-full flex items-center justify-center space-x-4">
          {/* Lottie animation aligned to the left */}
          <Lottie animationData={Avatar} loop={true} className="w-16 h-16" />

          {/* Breadcrumb path centered */}
          <ul className="flex items-center space-x-2 md:space-x-4 text-sm md:text-base font-medium text-gray-700">
            <li className="flex items-center cursor-pointer transition duration-200 hover:text-gray-900">
              Home
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-gray-400 w-4 md:w-5 -rotate-90"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </li>
            <li className="flex items-center cursor-pointer transition duration-200 hover:text-gray-900">
              Profile
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-gray-400 w-4 md:w-5 -rotate-90"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </li>
            <li className="flex items-center font-semibold cursor-pointer hover:text-gray-900">
              Edit
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;

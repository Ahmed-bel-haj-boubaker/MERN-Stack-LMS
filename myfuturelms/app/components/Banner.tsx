"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Lottie from "lottie-react";
import Avatar from "../../public/images/LottieIFiles/Atom.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Banner: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter(Boolean) || []; // Ensure it's defined

  // Create a breadcrumb trail starting with "Home" and followed by the current path segments
  const breadcrumb = ["Home", ...pathSegments];

  return (
    <div className="bg-[#f4f1f9] text-black font-sans px-6 py-12">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <div className="w-full flex items-center justify-center space-x-4">
          <Lottie animationData={Avatar} loop={true} className="w-16 h-16" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="139"
            viewBox="0 0 150 139"
            fill="none"
            className=" absolute right-14 top-40 w-24 devpath:sm:block"
          >
            <path
              d="M113.8 47.8 96.2 52 78.4 39.2a2 2 0 0 1 .2-3.2L146 1.2c1.4-.7 3 .5 2.8 2L136.2 77a2 2 0 0 1-3.1 1.2l-17.9-12.7-1.4-17.7Z"
              fill="#F87171"
              stroke="#1F2937"
              stroke-width="1.5"
              stroke-linejoin="round"
            ></path>
            <path
              d="m113.8 47.8 32-43.5-30.6 61.2-1.4-17.7Z"
              fill="#F87171"
              stroke="#1F2937"
              stroke-width="1.5"
              stroke-linejoin="round"
            ></path>
            <path
              d="m113.8 47.8 32-43.5L96.3 52l17.6-4.2Z"
              fill="#F87171"
              stroke="#1F2937"
              stroke-width="1.5"
              stroke-linejoin="round"
            ></path>
            <path
              d="M108.3 55.9S94 100.4 59.5 90.2c-4.9-1.4-8.7-5.4-9.7-10.3-.8-3.6 0-7.5 6-9.2 4.3-1.3 9-.3 12.6 2.4 6.5 5 17 16 14.7 32.5a36 36 0 0 1-12.7 22.6c-11.9 10-35.8 19.9-69.4-14.8"
              stroke="#1F2937"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
            ></path>
          </svg>
          <ul className="flex items-center space-x-2 md:space-x-4 text-sm md:text-base font-medium text-gray-700">
            {breadcrumb.map((segment, index) => (
              <React.Fragment key={index}>
                <li className="flex items-center cursor-pointer transition duration-200 hover:text-gray-900">
                  {segment}
                </li>
                {index < breadcrumb.length - 1 && (
                  <li>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;

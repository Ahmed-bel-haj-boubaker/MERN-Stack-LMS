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

"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import courseThumbnails from "../../public/images/thumbnailcourse.png";

interface CourseProps {
  courseName: string;
  instructor: string;
  category: string;
  rating: number;
  price: number;
}

const CourseCard: React.FC<CourseProps> = ({
  courseName,
  instructor,
  category,
  rating,
  price,
}) => {
  return (
    <div
      className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg border border-black rounded-lg shadow-md p-3 w-full sm:w-64 flex flex-col justify-between mx-2"
      style={{
        boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "none")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "4px 4px 6px rgba(0, 0, 0, 0.2)")
      }
    >
      <div className="relative">
        <Image
          src={courseThumbnails}
          alt="course image"
          className="rounded-t-lg"
          layout="responsive"
          width={320}
          height={180}
        />
      </div>

      <div className="p-3">
        <div className="flex items-center mb-1">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
            {category}
          </span>
        </div>

        <h3 className="text-md font-bold text-gray-800 line-clamp-2 leading-tight mb-2">
          {courseName}
        </h3>

        <div className="flex items-center mb-2 text-yellow-500 text-xs">
          <FontAwesomeIcon icon={faStar} className="mr-1" />
          <span className="text-gray-600">{rating} Reviews</span>
        </div>

        <p className="text-xs text-gray-500 mb-3">By {instructor}</p>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center text-white font-bold text-xs px-3 py-2 rounded-full transition-transform transform hover:scale-105 duration-200 ease-in-out bg-indigo-600 hover:bg-yellow-400 hover:border hover:border-black hover:text-black"
            style={{
              transition:
                "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
            }}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "3px 3px 0px black")
            }
          >
            Get Started
            <div className="ml-2">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </button>
          <span className="text-md font-bold text-indigo-600">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

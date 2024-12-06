"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import courseThumbnails from "../../public/images/thumbnailcourse.png";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart } from "../redux/cartSlices/cartSlice";

interface CourseProps {
  courseName: string;
  instructor: string;
  category: string;
  rating: number;
  price: number;
  id: string;
}

const CourseCard: React.FC<CourseProps> = ({
  courseName,
  id,
  instructor,
  category,
  rating,
  price,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.cart.error);

  const handleNavigate = () => {
    const slug = slugify(courseName, { lower: true });
    router.push(`/courses/${slug}?id=${id}`);
  };
  const pushTocart = () => {
    const course = { courseName, id, instructor, category, rating, price };
    dispatch(addToCart(course));
    if (error) {
      alert(error);
    }
  };
  return (
    <div
      className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg border border-black rounded-lg shadow-md p-3 w-full sm:w-64 flex flex-col justify-between  "
      style={{
        boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "none")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "4px 4px 6px rgba(0, 0, 0, 0.2)")
      }
    >
      <div className="relative" onClick={handleNavigate}>
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
          <div className=" ml-20 flex justify-end text-md font-bold text-indigo-600">
            ${price}
          </div>
        </div>

        <h3
          className="relative text-md font-bold text-gray-800 line-clamp-2 leading-tight mb-2 group"
          onClick={handleNavigate}
        >
          {courseName}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-800 group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </h3>

        <div className="flex items-center mb-2 text-yellow-500 text-xs">
          <FontAwesomeIcon icon={faStar} className="mr-1" />
          <span className="text-gray-600">{rating} Reviews</span>
        </div>

        <p className="text-xs   mb-3">By {instructor}</p>

        <div className="flex items-center justify-between">
          <button
            onClick={handleNavigate}
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
            Enroll Now
            <div className="ml-2">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </button>
          <div className="flex space-x-2">
            <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex justify-center items-center transition-transform duration-200 ease-in-out transform hover:scale-110 hover:bg-indigo-600 hover:border-indigo-600  ">
              <HeartIcon className="h-5 w-5 text-gray-400 transition-colors duration-200 ease-in-out hover:text-white" />
            </div>
            <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex justify-center items-center transition-transform duration-200 ease-in-out transform hover:scale-110 hover:bg-indigo-600 hover:border-indigo-600  ">
              <button onClick={() => pushTocart()}>
                <ShoppingCartIcon className="h-5 w-5 text-gray-400 transition-colors duration-200 ease-in-out hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

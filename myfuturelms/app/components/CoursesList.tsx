/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Ticket from "./Ticket";

import CourseCard from "./CourseCard";

const LeftArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-1/2 bottom-[-1rem] transform -translate-x-[120%] cursor-pointer xl:block hidden
      transition-all duration-300 ease-in-out bg-indigo-600 hover:scale-110 hover:bg-indigo-700 hover:shadow-lg"
      onClick={onClick}
      style={{
        boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "none")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "4px 4px 0px rgba(0, 0, 0, 0.2)")
      }
    >
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="text-yellow-400 xl:size-20 bg-indigo-600 md:rounded-full lg:size-14"
      />
    </div>
  );
};

const RightArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-1/2 bottom-[-1rem] transform translate-x-[120%] cursor-pointer xl:block hidden
      transition-all duration-300 ease-in-out bg-indigo-600 hover:scale-110 hover:bg-indigo-700 hover:shadow-lg"
      onClick={onClick}
      style={{
        boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "none")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "4px 4px 0px rgba(0, 0, 0, 0.2)")
      }
    >
      <FontAwesomeIcon
        icon={faArrowRight}
        className="text-yellow-400 xl:size-20 bg-indigo-600 md:rounded-full lg:size-14"
      />
    </div>
  );
};

const CoursesList = () => {
  const coursesItems = [
    {
      courseName: "Master the Fundamentals of Math",
      instructor: "David Millar",
      category: "Business",
      rating: 4.8,
      price: 15.0,
    },
    {
      courseName: "Master the Fundamentals of Math",
      instructor: "David Millar",
      category: "Data Science",
      rating: 4.5,
      price: 15.0,
    },
    {
      courseName: "Learning JavaScript with Imagination",
      instructor: "David Millar",
      category: "Development",
      rating: 4.8,
      price: 15.0,
    },
    {
      courseName: "Learning JavaScript with Imagination",
      instructor: "David Millar",
      category: "Development",
      rating: 4.8,
      price: 15.0,
    },
    {
      courseName: "Learning JavaScript with Imagination",
      instructor: "David Millar",
      category: "Development",
      rating: 4.8,
      price: 15.0,
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      { breakpoint: 1433, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-5 mb-40 max-lg:mb-20 mt-16 bg-white"
    >
      <div className="flex flex-col items-center mb-8 mt-16">
        <Ticket text="Trending Courses" />
        <h2 className="text-4xl font-bold leading-tight max-lg:text-2xl md:text-6xl lg:text-5xl text-center mt-4 mb-3">
          Explore Our <span className="text-indigo-600">World's</span> Best
          Courses
        </h2>
        <p className="text-gray-400 text-center max-lg:text-sm">
          When known printer took a galley of type scrambled make
        </p>
      </div>
      <div className="mb-24">
        <Slider {...settings}>
          {coursesItems.map((courseItem, index) => (
            <div key={index} className="px-2 xl:mt-10 xl:mb-28">
              <div className="mx-2 md:mx-5 lg:mx-11 bg-white">
                <CourseCard
                  courseName={courseItem.courseName}
                  instructor={courseItem.instructor}
                  category={courseItem.category}
                  rating={courseItem.rating}
                  price={courseItem.price}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>
  );
};

export default CoursesList;

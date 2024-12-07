/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import {
  faJs,
  faCss3Alt,
  faHtml5,
  faReact,
  faPython,
  faNodeJs,
  faBootstrap,
} from "@fortawesome/free-brands-svg-icons";
import Ticket from "./Ticket";

const categoryImages = [
  { ImageSrc: faHtml5, categoryName: "HTML", count: 22, color: "#E34F26" },
  { ImageSrc: faCss3Alt, categoryName: "CSS", count: 22, color: "#1572B6" },
  {
    ImageSrc: faBootstrap,
    categoryName: "Bootstrap",
    count: 22,
    color: "#7952B3",
  },
  { ImageSrc: faJs, categoryName: "JavaScript", count: 22, color: "#F7DF1E" },
  { ImageSrc: faReact, categoryName: "ReactJS", count: 22, color: "#61DAFB" },
  { ImageSrc: faNodeJs, categoryName: "NodeJS", count: 22, color: "#68A063" },
  { ImageSrc: faPython, categoryName: "Python", count: 22, color: "#3776AB" },
];

const LeftArrow = (props: any) => {
  const { onClick } = props;

  return (
    <div
      className="absolute xl:left-[45vh] top-64   transform -translate-y-1/2 cursor-pointer xl:block hidden 
    transition-all duration-300 ease-in-out bg-indigo-600   hover:bg-indigo-700 hover:scale-110 hover:shadow-lg"
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
        className="text-yellow-400 xl:size-20  bg-indigo-600 md:rounded-full lg:size-14"
      />
    </div>
  );
};

const RightArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute xl:right-[45vh] top-64  transform -translate-y-1/2 cursor-pointer xl:block hidden 
    transition-all duration-300 ease-in-out bg-indigo-600  hover:scale-110 hover:bg-indigo-700 hover:shadow-lg"
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
        className="text-yellow-400 xl:size-20  bg-indigo-600 md:rounded-full lg:size-14"
      />
    </div>
  );
};

const Categories = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
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
      className="p-5 mb-40 max-lg:mb-20 mt-11 bg-white "
    >
      <div className="flex flex-col items-center mb-8">
        <Ticket
          text="Trending Categories"
          className="text-indigo-800 font-bold"
        />
        <h2 className="text-4xl font-bold leading-tight max-lg:text-2xl md:text-6xl lg:text-5xl text-center mt-4">
          Top <span className="text-indigo-600">Categories</span>That We Have
        </h2>
      </div>
      <div className="relative max-w-6xl mx-auto xl:mt-10 xl:mb-28  md:mt-5 md:mb-14 px-4 sm:px-6 lg:px-8 py-6 bg-white xl:rounded-full shadow-lg sm:rounded-2xl   ">
        <Slider {...settings}>
          {categoryImages.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-2 px-4 py-4 md:px-6 lg:px-8 bg-white "
            >
              <div
                className="flex items-center justify-center w-20 h-20 rounded-full border border-gray-400 transition-transform transform hover:scale-105 duration-200 ease-in-out"
                style={{
                  transition:
                    "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "4px 4px 0px gray")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <FontAwesomeIcon
                  icon={category.ImageSrc}
                  size="3x"
                  className="text-gray-400 transition-all duration-300"
                  style={{
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = category.color)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#4A5568")
                  }
                />
              </div>

              <p className="text-lg font-semibold text-gray-700 text-center">
                {category.categoryName}
              </p>
              <p className="text-gray-500 text-sm text-center">
                ({category.count})
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>
  );
};

export default Categories;

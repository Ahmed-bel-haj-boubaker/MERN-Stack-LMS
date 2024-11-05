"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const NewsLetter = () => {
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
      <div className="bg-indigo-600 py-16 px-6 font-[sans-serif]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center md:gap-6 gap-12">
          <div className="max-md:order-1">
            <h2 className="text-white text-4xl font-poppins mb-6">
              Want To Stay <span className="font-bold">Informed</span> About New{" "}
              <span className="font-bold">Courses</span> &
              <span className="font-bold">Study</span> ?
            </h2>

            <div className="mt-12 flex max-lg:flex max-lg:flex-col cmax-sm:flex-col sm:gap-4 gap-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full bg-gray-50 py-3.5 px-4 text-[#333] text-base focus:outline-none"
              />
              <button
                className="border border-black px-7 whitespace-nowrap text-black font-bold rounded-full transition-transform transform hover:scale-105 duration-200 ease-in-out bg-yellow-400 max-lg:w-52 max-lg:h-10 max-lg:justify-center mx-auto sm:mx-0"
                style={{
                  boxShadow: "4px 4px 0px black",
                  transition:
                    "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "none")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "4px 4px 0px black")
                }
              >
                Subscribe Now
              </button>
            </div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ y: 0 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-60 w-40 shrink-0 inline-block"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#64b5f6"
                  d="m0 192 246.528 156.896c2.816 2.08 6.144 3.104 9.472 3.104s6.656-1.024 9.472-3.104L512 192 265.6 3.2a16.032 16.032 0 0 0-19.2 0L0 192z"
                  data-original="#64b5f6"
                />
                <path
                  fill="#eceff1"
                  d="M416 0H96C78.368 0 64 14.368 64 32v352c0 8.832 7.168 16 16 16h352c8.832 0 16-7.168 16-16V32c0-17.632-14.336-32-32-32z"
                  data-original="#eceff1"
                />
                <path
                  fill="#90a4ae"
                  d="M144 96h224c8.832 0 16-7.168 16-16s-7.168-16-16-16H144c-8.832 0-16 7.168-16 16s7.168 16 16 16zm224 32H144c-8.832 0-16 7.168-16 16s7.168 16 16 16h224c8.832 0 16-7.168 16-16s-7.168-16-16-16zm-96 64H144c-8.832 0-16 7.168-16 16s7.168 16 16 16h128c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
                  data-original="#90a4ae"
                />
                <path
                  fill="#1e88e5"
                  d="M265.472 348.896c-2.816 2.08-6.144 3.104-9.472 3.104s-6.656-1.024-9.472-3.104L0 192v288c0 17.664 14.336 32 32 32h448c17.664 0 32-14.336 32-32V192L265.472 348.896z"
                  data-original="#1e88e5"
                />
                <path
                  fill="#2196f3"
                  d="M480 512H32c-17.952 0-32-14.048-32-32a16.02 16.02 0 0 1 6.528-12.896l240-160c2.816-2.08 6.144-3.104 9.472-3.104s6.656 1.024 9.472 3.104l240 160A16.02 16.02 0 0 1 512 480c0 17.952-14.048 32-32 32z"
                  data-original="#2196f3"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsLetter;

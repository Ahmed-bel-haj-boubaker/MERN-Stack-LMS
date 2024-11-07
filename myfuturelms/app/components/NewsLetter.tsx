"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MailBox from "../../public/images/LottieIFiles/Mailbox.json";
import Lottie from "lottie-react";

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
              <span className="font-bold">Courses</span> &{" "}
              <span className="font-bold">Study</span> ?
            </h2>

            <div className="mt-12 flex max-lg:flex max-lg:flex-col sm:gap-4 gap-6">
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
              className="h-72 w-72 mx-auto" // Fixed dimensions for the container
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
              <Lottie animationData={MailBox} loop={true} className="h-full w-full" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsLetter;

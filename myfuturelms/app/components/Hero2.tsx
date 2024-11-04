"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logo from "../../public/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Ticket from "./Ticket";

const Hero2 = () => {
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
      className="flex "
    >
      <div className="font-sans px-6 py-7 overflow-hidden">
        <div className="relative justify-around flex max-lg:flex-col items-center gap-12">
          <div className="image-left w-[50%] lg:ml-8 xl:ml-12">
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
              <div>
                <Image src={Logo} alt="logo" className="" />
              </div>
            </motion.div>
          </div>

          <motion.div className="w-full xl:w-[50%] text-left">
            <div className="flex flex-col items-start mb-8">
              <Ticket text="Get More About Us" />
            </div>
            <h2 className="text-gray-800 text-left md:text-3xl xl:text-5xl font-bold mb-4 leading-snug lg:leading-[55px]">
              <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-4 max-w-full">
                <div className="flex max-lg:text-2xl text-left whitespace-nowrap">
                  <div>All Your Business</div>
                  <div className="px-5 bg-[url('/images/test.svg')] bg-cover bg-center rounded-lg text-center">
                    In One App.
                  </div>
                </div>
              </div>
            </h2>
            <div className="mt-4 max-lg:text-2xl">
              <p className="text-gray-500 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo quia porro ullam, odio sit id facilis tenetur totam
                itaque fugit autem accusamus illo sequi. Ipsum minus corrupti
                blanditiis totam expedita.
              </p>

              <ul className="flex mt-9 flex-col space-y-2">
                {["Web Dev", "App Dev", "UI/UX Design"].map((text, index) => (
                  <li
                    key={index}
                    className="text-black font-bold flex items-center"
                  >
                    <span
                      className="flex items-center justify-center px-4 py-3 rounded-full transition-transform transform hover:scale-105 duration-200 ease-in-out bg-indigo-600 hover:bg-yellow-400 hover:border hover:border-black "
                      style={{
                        transition:
                          "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                      }}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow = "none")
                      }
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow = "3px 3px 0px black")
                      }
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-white hover:text-black"
                      />
                    </span>
                    <span className="ml-2">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12">
              <button
                type="button"
                className="flex items-center text-white font-bold text-sm px-4 py-3 rounded-full transition-transform transform hover:scale-105 duration-200 ease-in-out bg-indigo-600 hover:bg-yellow-400 hover:border hover:border-black hover:text-black"
                style={{
                  transition:
                    "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                }}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "3px 3px 0px black")
                }
              >
                Getting Started
                <div className="ml-2">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero2;

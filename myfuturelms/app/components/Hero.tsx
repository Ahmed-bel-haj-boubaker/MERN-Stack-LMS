"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import HeroImg from "../../public/images/heroImg.png";
import Arrow from "../../public/images/right-arrow-next-svgrepo-com.svg";
import Html from "../../public/images/html-5-svgrepo-com.svg";
import Css from "../../public/images/css-3-svgrepo-com.svg";
import Js from "../../public/images/js-official-svgrepo-com.svg";
import ReactJs from "../../public/images/react-svgrepo-com.svg";
import Python from "../../public/images/python-svgrepo-com.svg";
import Tailwind from "../../public/images/tailwind-svgrepo-com.svg";
import Unamedq from "../../public/images/unnamed.png";

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <section className=" text-gray-800">
        <div className="container flex flex-col-reverse justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center lg:max-w-md xl:max-w-lg lg:text-left max-lg:text-center">
            <h1 className="text-4xl font-bold leading-tight max-lg:text-2xl md:text-6xl lg:text-5xl ">
              <div className="hidden xl:flex xl:pl-96">
                <Image src={Unamedq} alt="ll" loading="lazy" quality={50} />
              </div>
              Elevate Your{" "}
              <span className="text-indigo-600 mr-1"> Learning</span>
              Experience
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700">
              Discover powerful tools to transform your knowledge into skills.
              Unlock your potential with interactive lessons and hands-on
              projects.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="px-8 py-3 text-lg font-semibold rounded bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
              >
                Get Started
              </a>
              <a
                href="#"
                className="px-8 py-3 text-lg font-semibold border rounded border-gray-800 hover:bg-gray-800 hover:text-white transition duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
          {/* Image section with animated icons */}
          <div className="flex justify-center mb-8 lg:mb-0 relative">
            <div className="relative bg-indigo-600 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center shadow-lg">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <Image
                  src={HeroImg}
                  alt="logo"
                  layout="responsive"
                  width={400}
                  height={400}
                  className="object-cover rounded-full transform hover:scale-105 transition-transform duration-300"
                  priority
                  quality={75}
                />
              </motion.div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-indigo-600 via-transparent to-transparent opacity-70"></div>
            </div>
            {/* Icon Animations */}
            {isInView && (
              <>
                <Image
                  src={Arrow}
                  alt="Arrow Icon"
                  className="hidden xl:block absolute top-16 left-4 w-10 h-10 animate-move-right"
                  loading="lazy"
                  quality={75}
                />
                <Image
                  src={Html}
                  alt="HTML Icon"
                  className="hidden xl:block absolute -top-12 left-12 w-12 h-12 animate-bounce"
                  loading="lazy"
                  quality={75}
                />
                <Image
                  src={Css}
                  alt="CSS Icon"
                  className="hidden xl:block absolute top-4 right-12 w-12 h-12 animate-pulse"
                  loading="lazy"
                  quality={75}
                />
                <Image
                  src={Js}
                  alt="JS Icon"
                  className="hidden xl:block absolute bottom-12 left-8 w-12 h-12 animate-bounce"
                  loading="lazy"
                  quality={75}
                />
                <Image
                  src={ReactJs}
                  alt="React Icon"
                  className="hidden xl:block absolute bottom-16 right-8 w-12 h-12 animate-spin-slow"
                  loading="lazy"
                  quality={75}
                />
                <Image
                  src={Python}
                  alt="Python Icon"
                  className="hidden xl:block absolute left-1/2 w-12 h-12 animate-float"
                  loading="lazy"
                  quality={75}
                />
                <Image
                  src={Tailwind}
                  alt="Tailwind Icon"
                  className="hidden xl:block absolute bottom-2 left-1/4 w-12 h-12 animate-pulse"
                  loading="lazy"
                  quality={75}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Hero;

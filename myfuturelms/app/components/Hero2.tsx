"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logo from "../../public/images/logo.png";

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
    >
      <div className="font-sans bg-gray-800 px-6 py-12 overflow-hidden">
        <div className="grid md:grid-cols-2 items-center gap-12">
          <motion.div>
            <h2 className="text-white lg:text-5xl md:text-4xl text-3xl font-bold mb-4 lg:!leading-[55px]">
              All your business finances in one app.
            </h2>
            <p className="text-white mt-6 text-base leading-relaxed">
              Explore a curated collection of ready-to-use components and design
              blocks, empowering you to create stunning, responsive interfaces
              with ease. Streamline your workflow, amplify your creativity, and
              discover the future of web development, all at your fingertips.
            </p>
            <div className="mt-12">
              <button
                type="button"
                className="bg-white hover:bg-gray-100 transition-all text-gray-800 font-bold text-sm rounded px-5 py-3"
              >
                Getting Started
              </button>
              <a className="text-white text-sm font-bold underline sm:ml-6 max-sm:mt-4 max-sm:block whitespace-nowrap">
                API Documentation
              </a>
            </div>
          </motion.div>

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
            <Image src={Logo} alt="logo" className=" absolute right-0 -top-60" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero2;

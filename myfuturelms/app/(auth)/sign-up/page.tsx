"use client";
import Lottie from "lottie-react";
import Wwww from "../../../public/images/LottieIFiles/wwww.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Google from "../../../public/images/google.png";
import Button from "@/app/components/Button";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
/* eslint-disable react/no-unescaped-entities */

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-8 space-y-8 bg-white shadow-2xl rounded-3xl md:flex-row md:space-y-0 w-full max-w-6xl">
        <div className="flex flex-col justify-center p-12 md:p-16 w-full md:w-1/2">
          <span className="mb-5 text-5xl font-bold">Create an account</span>
          <span className="font-light text-gray-500 mb-10 text-lg">
            Sign up to get started with our services
          </span>

          <div className="py-5">
            <span className="mb-3 text-lg">Full Name</span>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder:font-light placeholder:text-gray-500 text-lg"
              name="fullname"
              id="fullname"
            />
          </div>

          <div className="py-5">
            <span className="mb-3 text-lg">Email</span>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder:font-light placeholder:text-gray-500 text-lg"
              name="email"
              id="email"
            />
          </div>

          <div className="py-5">
            <span className="mb-3 text-lg">Password</span>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder:font-light placeholder:text-gray-500 text-lg"
            />
          </div>

          <Button text="Sign up" />

          <div className="flex items-center my-4">
            <div className="h-[1px] bg-gray-300 flex-1"></div>
            <span className="px-4 text-gray-500">OR</span>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          <div className="flex justify-around">
            <button className="border border-gray-300 text-lg p-4 rounded-lg mb-8 hover:bg-black hover:text-white transition-all flex items-center">
              <Image src={Google} alt="google" className="w-6 h-6 mr-3" />
              Google
            </button>
            <button className="flex items-center border border-gray-300 text-lg p-4 rounded-lg mb-8 hover:bg-black hover:text-white transition-all">
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6 mr-3" />
              GitHub
            </button>
          </div>

          <div className="text-center text-gray-500 text-lg">
            Already have an account?{" "}
            <span className="font-bold text-black cursor-pointer relative group">
              Sign in
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 flex items-center max-lg:hidden">
          <Lottie
            animationData={Wwww}
            loop={true}
            className="w-[500px] h-full hidden md:block rounded-r-3xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

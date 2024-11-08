"use client";

import Lottie from "lottie-react";
import PcTable from "../../../public/images/LottieIFiles/tablepc.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Google from "../../../public/images/google.png";
import Button from "@/app/components/Button";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import Api from "@/app/Api's";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* eslint-disable react/no-unescaped-entities */

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleGitHubLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/github`);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const response = await axios.post(Api.login, { email, password });
    console.log(response);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-8 space-y-8 bg-white shadow-2xl rounded-3xl md:flex-row md:space-y-0 w-full max-w-6xl">
        <div className="flex flex-col justify-center p-12 md:p-16 w-full md:w-1/2">
          <span className="mb-5 text-5xl font-bold">Welcome back</span>
          <span className="font-light text-gray-500 mb-10 text-lg">
            Welcome back! Please enter your details
          </span>
          <div className="py-5">
            <span className="mb-3 text-lg">Email</span>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder:font-light placeholder:text-gray-500 text-lg"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="py-5">
            <span className="mb-3 text-lg">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder:font-light placeholder:text-gray-500 text-lg"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex justify-between w-full py-5 text-lg">
            <div>
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span>Remember for 30 days</span>
            </div>
            <span className="font-bold text-black cursor-pointer relative group">
              <Link href="/forgot-password"> Forgot Password</Link>

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
          </div>

          <Button text="Sign in" onClicks={handleLogin} />

          <div className="flex items-center my-4">
            <div className="h-[1px] bg-gray-300 flex-1"></div>
            <span className="px-4 text-gray-500">OR</span>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>
          <div className="flex justify-around">
            <button className="border border-gray-300 text-lg p-4 rounded-lg mb-8 hover:bg-black hover:text-white transition-all">
              <Image src={Google} alt="google" className="size-9 inline mr-3" />
              Google
            </button>
            <button
              onClick={handleGitHubLogin}
              className="flex items-center border border-gray-300 text-lg p-4 rounded-lg mb-8 hover:bg-black hover:text-white transition-all"
            >
              <FontAwesomeIcon icon={faGithub} className="size-9 inline mr-3" />
              Github
            </button>
          </div>
          <div className="text-center text-gray-500 text-lg">
            Don't have an account?{" "}
            <span className="font-bold text-black cursor-pointer relative group">
              <Link href="/sign-up">
                Sign up for free
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </span>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 flex items-center">
          <Lottie
            animationData={PcTable}
            loop={true}
            className="w-full h-full hidden md:block rounded-r-3xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

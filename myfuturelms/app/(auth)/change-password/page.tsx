"use client";
import Lottie from "lottie-react";
import PcTable from "../../../public/images/LottieIFiles/tablepc.json";
import Button from "@/app/components/Button";
import { useState } from "react";
import Api from "@/app/Api's";
import axios from "axios";
import { redirect, useSearchParams } from "next/navigation";
/* eslint-disable react/no-unescaped-entities */

const ChangePassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordUpdate = async () => {
    if (!newPassword) {
      console.error("Password cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(Api.change_password, {
        email,
        newPassword,
      });
      redirect("/login");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-8 space-y-8 bg-white shadow-2xl rounded-3xl md:flex-row md:space-y-0 w-full max-w-6xl">
        <div className="flex flex-col justify-center p-12 md:p-16 w-full md:w-1/2">
          <h1 className="mb-5 text-5xl font-bold">Update your password</h1>
          <p className="font-light text-gray-500 mb-10 text-lg">
            Welcome back! Please enter your new password.
          </p>

          <div className="py-5">
            <label htmlFor="new-password" className="mb-3 text-lg block">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              aria-label="Enter new password"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder:font-light placeholder:text-gray-500 text-lg"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Enter your new password"
            />
          </div>

          <Button text="Update Password" onClicks={handlePasswordUpdate} />
        </div>

        <div className="relative w-full md:w-1/2 flex items-center">
          <Lottie
            animationData={PcTable}
            loop
            className="w-full h-full hidden md:block rounded-r-3xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

"use client";

import Image from "next/image";
import React from "react";
import Avatar from "../../../public/images/avatar.png";
import Button from "../Button";

interface IUserData {
  username?: string;
  numCourses?: number;
  role?: string;
}
const ProfileBanner: React.FC<IUserData> = ({ numCourses, username, role }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 md:p-10 shadow-lg mt-4 mb-10">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
            <Image
              src={Avatar}
              alt={username || "user name"}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold">{username}</h3>
            {role === "instructor" || role === "admin" ? (
              <Button text="Become an Instructor" />
            ) : (
              <p className="text-sm md:text-base">
                {numCourses} Courses Enrolled | 4 Certificates
              </p>
            )}
          </div>
        </div>

        {role === "instructor" || role === "admin" ? (
          <Button text="Create A New Course" />
        ) : (
          <Button text="Become an Instructor" />
        )}
      </div>
    </div>
  );
};

export default ProfileBanner;

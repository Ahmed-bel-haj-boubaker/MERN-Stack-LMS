"use client";

import { useState, useEffect } from "react";
import {
  HomeIcon,
  UserIcon,
  BookOpenIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import useUserConnected from "@/app/hooks/user/useUserConnected";

interface IUserInfo {
  userName?: string;
  setActiveComponent?: (
    component:
      | "dashboard"
      | "profile"
      | "courses"
      | "settings"
      | "instructorCourses"
  ) => void;
}

const ProfileSideBar: React.FC<IUserInfo> = ({
  setActiveComponent,
  userName,
}) => {
  const { user } = useUserConnected(); // Assuming useUserConnected provides the user role.
  const [activeItem, setActiveItem] = useState<
    "dashboard" | "profile" | "courses" | "settings" | "Instructor"
  >("dashboard");

  // Base menu items for all users
  const menuItems = [
    { name: "Dashboard", key: "dashboard", icon: HomeIcon },
    { name: "My Profile", key: "profile", icon: UserIcon },
    { name: "Settings", key: "settings", icon: CogIcon },
  ];

  if (user?.role === "user") {
    menuItems.unshift({
      name: "Enrolled Courses",
      key: "courses",
      icon: BookOpenIcon,
    });
  }

  // Conditionally add the "Instructor Courses" item for admins or instructors
  if (user?.role === "admin" || user?.role === "instructor") {
    menuItems.unshift({
      name: "Instructor Courses",
      key: "Instructor",
      icon: BookOpenIcon,
    });
  }

  const handleClick = (
    key: "dashboard" | "profile" | "courses" | "settings" | "Instructor"
  ) => {
    setActiveItem(key);
    setActiveComponent && setActiveComponent(key);
  };

  return (
    <div className="bg-white max-lg:m-3 border -mt-3 border-gray-100 rounded-2xl">
      <div className="p-3 max-lg:flex-col max-lg:justify-center">
        <div className="grid grid-cols-1 mb-6 mt-3 ">
          <div className="text-sm   font-bold ">
            <span className="text-2xl">👋</span> Welcome, {userName}
          </div>
        </div>

        <div>
          <ul className="flex flex-col max-lg:justify-center">
            {menuItems.map(({ name, key, icon: Icon }) => (
              <li
                key={key}
                className="mb-4 font-semibold bg-gray-50 rounded-lg"
              >
                <button
                  onClick={() => handleClick(key)}
                  className={`flex items-center p-3 rounded-lg text-left group ${
                    activeItem === key
                      ? "bg-gray-100 w-full  text-blue-600"
                      : "hover:bg-gray-100  w-full"
                  }`}
                >
                  <div>
                    <Icon
                      className={`h-5 w-5  mr-3 group-hover:text-blue-600 ${
                        activeItem === key ? " text-blue-600" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <span className="group-hover:text-blue-600">{name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;

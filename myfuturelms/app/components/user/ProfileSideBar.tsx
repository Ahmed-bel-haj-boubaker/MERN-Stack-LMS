"use client";

import { useState } from "react";
import {
  HomeIcon,
  UserIcon,
  BookOpenIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

interface IUserInfo {
  userName: string;
  setActiveComponent: (component: "dashboard" | "profile") => void;
}

const ProfileSideBar: React.FC<IUserInfo> = ({
  setActiveComponent,
  userName,
}) => {
  const [activeItem, setActiveItem] = useState<
    "dashboard" | "profile" | "courses" | "settings"
  >("dashboard");

  const menuItems = [
    { name: "Dashboard", key: "dashboard", icon: HomeIcon },
    { name: "My Profile", key: "profile", icon: UserIcon },
    { name: "Enrolled Courses", key: "courses", icon: BookOpenIcon },
    { name: "Settings", key: "settings", icon: CogIcon },
  ];

  const handleClick = (
    key: "dashboard" | "profile" | "courses" | "settings"
  ) => {
    setActiveItem(key);
    setActiveComponent(key);
  };

  return (
    <aside className="p-6">
      <h2 className="text-sm mb-6">Welcome, {userName}</h2>
      <ul>
        {menuItems.map(({ name, key, icon: Icon }) => (
          <li key={key} className="mb-4">
            <button
              onClick={() => handleClick(key)}
              className={`flex items-center p-3 rounded-lg w-full text-left ${
                activeItem === key ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
            >
              <Icon className="h-5 w-5 text-gray-600 mr-3" />
              {name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ProfileSideBar;

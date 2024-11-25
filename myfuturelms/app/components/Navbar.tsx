"use client";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import {
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "./Button";
import useUserConnected from "../hooks/user/useUserConnected";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isLogged, userName, handleLogout } = useUserConnected();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="  mx-auto py-1 px-4 md:px-8 flex justify-around items-center bg-white ">
        <div className="flex items-center">
          <Image
            src={Logo}
            alt="Logo"
            className="lg:size-28 md:size-16  max-lg:size-14"
          />
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-indigo-600 focus:outline-none"
          >
            <i
              className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}
            ></i>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex space-x-2 lg:space-x-4 text-sm md:text-base lg:text-lg font-poppins ">
          <li className="group relative flex items-center hover:bg-indigo-600 hover:text-white p-2">
            <a href="#">Home</a>
            <i className="fas fa-chevron-down ml-2 text-sm"></i>

            <ul className="absolute left-0 top-full mt-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-y-2 transition-all duration-300 ease-in-out z-10">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:text-indigo-600 text-black"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:text-indigo-600 text-black"
                >
                  Contact
                </a>
              </li>
            </ul>
          </li>
          <li className="group relative flex items-center hover:bg-indigo-600 hover:text-white p-2">
            <a href="#">Courses</a>
            <i className="fas fa-chevron-down ml-2 text-sm"></i>
          </li>
          <li className="group relative flex items-center hover:bg-indigo-600 hover:text-white p-2">
            <a href="#">Pages</a>
            <i className="fas fa-chevron-down ml-2 text-sm"></i>
          </li>
          <li className="group relative flex items-center hover:bg-indigo-600 hover:text-white p-2">
            <a href="#">Dashboard</a>
            <i className="fas fa-chevron-down ml-2 text-sm"></i>
          </li>
        </ul>

        {/* Search and Icons */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center border border-gray-300 rounded-full px-3 py-2 lg:px-4 lg:py-2"
            >
              <i className="fas fa-th-large mr-2"></i> Categories
              <i className="fas fa-chevron-down ml-2"></i>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-indigo-600 hover:text-white"
                  >
                    Category 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-indigo-600 hover:text-white"
                  >
                    Category 2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-indigo-600 hover:text-white"
                  >
                    Category 3
                  </a>
                </li>
              </ul>
            )}
          </div>

          <div className="flex items-center border border-gray-300 rounded-full px-3 py-2">
            <input
              type="text"
              placeholder="Search For Course..."
              className="focus:outline-none w-24 md:w-36 lg:w-56"
            />
            <button className="bg-indigo-600 ml-2 rounded-full p-2 hover:bg-yellow-400 duration-200 ease-in-out">
              <MagnifyingGlassIcon className="w-5 h-5 text-white hover:text-black" />
            </button>
          </div>

          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="relative">
              <div className="w-8 h-8 border-2 border-gray-600 rounded-full flex justify-center items-center transition-transform duration-200 ease-in-out transform hover:scale-110 hover:bg-indigo-600 hover:border-indigo-600  ">
                <HeartIcon className="h-5 w-5 text-gray-600 transition-colors duration-200 ease-in-out hover:text-white" />
              </div>
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs px-1 rounded-full">
                0
              </span>
            </div>
            <div className="relative">
              <div className="w-8 h-8 border-2 border-gray-600 rounded-full flex justify-center items-center transition-transform duration-200 ease-in-out transform hover:scale-110 hover:bg-indigo-600 hover:border-indigo-600">
                <ShoppingCartIcon className="h-5 w-5 text-gray-600 transition-colors duration-200 ease-in-out hover:text-white" />
              </div>
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs px-1 rounded-full">
                0
              </span>
            </div>

            {isLogged ? (
              <div className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold uppercase">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-semibold">
                    {userName}
                  </span>
                  <i
                    className={`fas fa-chevron-down transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Settings
                      </li>
                      <li
                        className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Button text="Sign Up" onClicks={} />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-4 py-4 text-lg px-4">
            <li>
              <a href="#" className="hover:text-indigo-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Pages
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Dashboard
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;

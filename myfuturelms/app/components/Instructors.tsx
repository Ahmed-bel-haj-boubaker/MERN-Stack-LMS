/* eslint-disable @next/next/no-img-element */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ticket from "./Ticket";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

export const Instructors = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full  md:px-24 lg:px-8 lg:py-20 bg-white">
      <div className="mx-auto mb-10 lg:max-w-xl sm:text-center ">
        <div className="flex flex-col items-center mb-8">
          <div className="text-4xl font-bold leading-tight max-lg:text-2xl md:text-6xl lg:text-5xl text-center mt-4">
            <h2 className="mb-4 font-poppins xl:text-3xl md:text-2xl max-lg:text-2xl">
              Our Top Class & Expert Instructors in One Place
            </h2>
          </div>
          <Ticket text="Our Talented Instructors" />
        </div>
        <p className="text-base text-gray-700 md:text-lg">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>
      </div>
      <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
        <div>
          <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
            <img
              className="absolute object-cover w-full h-full rounded  transition-all duration-300 ease-in-out hover:scale-110"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
              alt="Person"
            />
          </div>
          <div className="flex flex-col sm:text-center">
            <p className="text-lg font-bold">Oliver Aguilerra</p>
            <p className="mb-5 text-base text-indigo-600">Product Manager</p>
            <div className="flex items-center space-x-3 sm:justify-center">
              <a
                href="/"
                className="text-gray-600 transition duration-300 ease-in-out  bg-white hover:text-white hover:shadow-lg rounded-full border border-gray-600 p-3 flex items-center justify-center"
                style={{
                  width: "35px",
                  height: "35px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundImage =
                    "linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundImage = "none")
                }
              >
                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
              </a>

              <a
                href="/"
                className="text-gray-600 transition duration-300 ease-in-out hover:bg-deep-purple-500 hover:text-white hover:bg-blue-800 hover:shadow-lg rounded-full border border-gray-600 p-3 flex items-center justify-center"
                style={{
                  width: "35px",
                  height: "35px",
                }}
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
            <img
              className="absolute object-cover w-full h-full rounded  transition-all duration-300 ease-in-out hover:scale-110"
              src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="Person"
            />
          </div>
          <div className="flex flex-col sm:text-center">
            <p className="text-lg font-bold">Marta Clermont</p>
            <p className="mb-5 text-base text-indigo-600 ">Design Team Lead</p>
            <div className="flex items-center space-x-3 sm:justify-center">
              <a
                href="/"
                className="text-gray-600 transition duration-300 ease-in-out  bg-white hover:text-white hover:shadow-lg rounded-full border border-gray-600 p-3 flex items-center justify-center"
                style={{
                  width: "35px",
                  height: "35px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundImage =
                    "linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundImage = "none")
                }
              >
                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
              </a>

              <a
                href="/"
                className="text-gray-600 transition duration-300 ease-in-out hover:bg-deep-purple-500 hover:text-white hover:bg-blue-800 hover:shadow-lg rounded-full border border-gray-600 p-3 flex items-center justify-center"
                style={{
                  width: "35px",
                  height: "35px",
                }}
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
            <img
              className="absolute object-cover w-full h-full rounded  transition-all duration-300 ease-in-out hover:scale-110"
              src="https://images.pexels.com/photos/3747435/pexels-photo-3747435.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="Person"
            />
          </div>
          <div className="flex flex-col sm:text-center">
            <p className="text-lg font-bold">Alice Melbourne</p>
            <p className="mb-5 text-base text-indigo-600">Human Resources</p>
            <div className="flex items-center space-x-3 sm:justify-center">
              <a
                href="/"
                className="text-gray-600 transition duration-300 ease-in-out  bg-white hover:text-white hover:shadow-lg rounded-full border border-gray-600 p-3 flex items-center justify-center"
                style={{
                  width: "35px",
                  height: "35px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundImage =
                    "linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundImage = "none")
                }
              >
                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
              </a>

              <a
                href="/"
                className="text-gray-600 transition duration-300 ease-in-out hover:bg-deep-purple-500 hover:text-white hover:bg-blue-800 hover:shadow-lg rounded-full border border-gray-600 p-3 flex items-center justify-center"
                style={{
                  width: "35px",
                  height: "35px",
                }}
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
            <img
              className="absolute object-cover w-full h-full rounded  transition-all duration-300 ease-in-out hover:scale-110"
              src="https://images.pexels.com/photos/3931603/pexels-photo-3931603.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="Person"
            />
          </div>
          <div className="flex flex-col sm:text-center">
            <p className="text-lg font-bold">John Doe</p>
            <p className="mb-5 text-base text-indigo-600">Good guy</p>
            <div className="flex items-center space-x-3 sm:justify-center">
              <a
                href="/"
                className="text-gray-600 transition duration-300 ease-in-out  bg-white hover:text-white hover:shadow-lg rounded-full border border-gray-600 p-3 flex items-center justify-center"
                style={{
                  width: "35px",
                  height: "35px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundImage =
                    "linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundImage = "none")
                }
              >
                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
              </a>

              <a
                href="/"
                className="text-gray-600 transition duration-300 ease-in-out hover:bg-deep-purple-500 hover:text-white hover:bg-blue-800 hover:shadow-lg rounded-full border border-gray-600 p-3 flex items-center justify-center"
                style={{
                  width: "35px",
                  height: "35px",
                }}
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

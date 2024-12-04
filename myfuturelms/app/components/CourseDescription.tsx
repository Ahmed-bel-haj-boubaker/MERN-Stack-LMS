/* eslint-disable react/no-unescaped-entities */
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ibenefits, Iprerequisites } from "../types/CourseTypes";

interface ICourseDescriptionPropos {
  benefits: Ibenefits[];
  description: string;
  prerequisites: Iprerequisites[];
}
const CourseDescription: React.FC<ICourseDescriptionPropos> = ({
  benefits,
  description,
  prerequisites,
}) => {
  return (
    <div className="border border-gray-300 shadow-2xl p-6 mt-7 rounded-xl">
      <div>
        <h2 className="text-2xl text-[#161439] font-semibold">
          Course Description
        </h2>
        <p className="text-gray-500">{description}</p>
        <h2 className="mt-4 text-2xl text-[#161439] font-semibold">
          What you'll learn in this course?
        </h2>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          ullam nihil et atque enim labore error quo ducimus officiis! Nulla
          quae modi quis dolore saepe voluptates ipsa quisquam sapiente
          laudantium!
        </p>
        <ul className="flex mt-5 flex-col space-y-2">
          {benefits?.map((text, index) => (
            <li key={index} className="text-black font-bold flex items-center">
              <span
                className="flex items-center justify-center px-4 py-3 rounded-full transition-transform transform hover:scale-105 duration-200 ease-in-out bg-indigo-600 hover:bg-yellow-400 hover:border hover:border-black "
                style={{
                  transition:
                    "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                }}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "3px 3px 0px black")
                }
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-white hover:text-black"
                />
              </span>
              <span className="ml-2 text-[#161439]">{text.title}</span>
            </li>
          ))}
        </ul>
        <h2 className="mt-4 text-2xl text-[#161439] font-semibold">
          What you need to know before starting?
        </h2>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          ullam nihil et atque enim labore error quo ducimus officiis! Nulla
          quae modi quis dolore saepe voluptates ipsa quisquam sapiente
          laudantium!
        </p>
        <ul className="flex mt-5 flex-col space-y-2">
          {prerequisites?.map((text, index) => (
            <li key={index} className="text-black font-bold flex items-center">
              <span
                className="flex items-center justify-center px-4 py-3 rounded-full transition-transform transform hover:scale-105 duration-200 ease-in-out bg-indigo-600 hover:bg-yellow-400 hover:border hover:border-black "
                style={{
                  transition:
                    "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                }}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "3px 3px 0px black")
                }
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-white hover:text-black"
                />
              </span>
              <span className="ml-2 text-[#161439]">{text.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDescription;

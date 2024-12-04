import {
  faCirclePlay,
  faLock,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export interface ICourseDetails {
  videoUrl: string;
  videoLength: number;
  title: string;
  preview: boolean;
  videoSection: string;
  description: string;
  links: Array<string>;
  videoPlayer: string;
  suggestion: string;
  _id: string;
  questions: Array<string>;
}

interface ICourseData {
  courseData: Array<ICourseDetails>;
  description: string;
}

const Curriculum: React.FC<ICourseData> = ({ courseData, description }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const formatVideoLength = (lengthInSeconds: number): string => {
    const minutes = Math.floor(lengthInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (lengthInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-300 shadow-2xl p-6 mt-7 rounded-xl">
      <h2 className="text-2xl text-[#161439] font-semibold mb-2">
        Course Curriculum
      </h2>
      <p className="text-gray-600 mb-6">{description}</p>

      {/* Displaying each video in courseData */}
      {courseData.map((item, index) => (
        <div key={index} className="mb-4 border-b border-gray-300">
          <div
            className="flex justify-between items-center py-4 cursor-pointer"
            onClick={() => toggleSection(item.title)}
          >
            <h3
              className={`text-lg font-medium transition-colors duration-300 ${
                openSection === item.title ? "text-purple-700" : "text-black"
              }`}
            >
              {item.title}
            </h3>
            <span
              className={`text-xl transition-transform duration-300 ${
                openSection === item.title
                  ? "rotate-180 text-purple-700"
                  : "rotate-0"
              }`}
            >
              {openSection === item.title ? (
                <FontAwesomeIcon icon={faMinus} />
              ) : (
                <FontAwesomeIcon icon={faPlus} />
              )}
            </span>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out ${
              openSection === item.title
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <p className="mb-2"> {item.description}</p>
            <div className="flex items-center bg-purple-50 p-2 space-y-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <div className="group bg-white flex items-center justify-center rounded-full text-violet-900">
                    <FontAwesomeIcon
                      className="  text-xl  group-hover:fill-white"
                      icon={faCirclePlay}
                    />
                  </div>

                  <p>{item.videoSection}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">
                    {formatVideoLength(item.videoLength)}
                  </span>
                  {!item.preview && <FontAwesomeIcon icon={faLock} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Curriculum;

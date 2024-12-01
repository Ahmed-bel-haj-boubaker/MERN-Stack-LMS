/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
interface ICourseData {
  courseData: Array<string>;
}
const Curriculum: React.FC<ICourseData> = ({ courseData }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section: any) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-2">Course Curriculum</h2>
      <p className="text-gray-600 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.
      </p>

      {/* Section: Introduction */}
      <div className="mb-4 border-b border-gray-300">
        <div
          className="flex justify-between items-center py-4 cursor-pointer"
          onClick={() => toggleSection("introduction")}
        >
          <h3 className="text-lg font-medium text-purple-700">Introduction</h3>
          <span>
            {openSection === "introduction" ? (
              <span className="text-xl">-</span>
            ) : (
              <span className="text-xl">+</span>
            )}
          </span>
        </div>
        {openSection === "introduction" && (
          <div className="bg-purple-50 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <button className="text-purple-600 text-xl">&#9654;</button>
                <p>Course Installation</p>
              </div>
              <span className="text-sm text-gray-500">03:03</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <button className="text-purple-600 text-xl">&#9654;</button>
                <p>Create a Simple React App</p>
              </div>
              <span className="text-sm text-gray-500">07:48</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <button className="text-purple-600 text-xl">&#9654;</button>
                <p>React for the Rest of us</p>
              </div>
              <span className="text-sm text-gray-500">10:48</span>
            </div>
          </div>
        )}
      </div>

      {/* Section: Capacitance and Inductance */}
      <div className="mb-4 border-b border-gray-300">
        <div
          className="flex justify-between items-center py-4 cursor-pointer"
          onClick={() => toggleSection("capacitance")}
        >
          <h3 className="text-lg font-medium">Capacitance and Inductance</h3>
          <span>
            {openSection === "capacitance" ? (
              <span className="text-xl">-</span>
            ) : (
              <span className="text-xl">+</span>
            )}
          </span>
        </div>
      </div>

      {/* Section: Final Audit */}
      <div className="border-b border-gray-300">
        <div
          className="flex justify-between items-center py-4 cursor-pointer"
          onClick={() => toggleSection("final")}
        >
          <h3 className="text-lg font-medium">Final Audit</h3>
          <span>
            {openSection === "final" ? (
              <span className="text-xl">-</span>
            ) : (
              <span className="text-xl">+</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;

import {
  BanknotesIcon,
  BookOpenIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import CoursesList from "../instructor/CoursesList";
import useUserConnected from "@/app/hooks/user/useUserConnected";
import { useEffect, useState } from "react";

const ProfileDashboard = () => {
  const { userRole } = useUserConnected();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(userRole === "admin" || userRole === "instructor");
  }, [userRole]);
  return (
    <div className="bg-gray-50 p-6 rounded-lg border w-[100%]">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-x-7 gap-y-7">
        {visible && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center justify-start">
            <div className="bg-white rounded-full p-3 flex items-center justify-center">
              <BanknotesIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <div className="ml-4 font-bold text-xl">30</div>
              <span className="ml-4 text-sm">Total Earning</span>
            </div>
          </div>
        )}

        {visible && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center">
            <div className="bg-white rounded-full p-3 flex items-center justify-center">
              <BookOpenIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <div className="ml-4 font-bold text-xl">30</div>
              <div className="ml-4 text-sm">Courses</div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center">
          <div className="bg-white rounded-full p-3 flex items-center justify-center">
            <AcademicCapIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <div className="ml-4 font-bold text-xl">30</div>
            <span className="ml-4 text-sm">Enrolled Courses</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center">
          <div className="bg-white rounded-full p-3 flex items-center justify-center">
            <PlayCircleIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <div className="ml-4 font-bold text-xl">30</div>
            <div className="ml-4 text-sm">Active Courses</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center">
          <div className="bg-white rounded-full p-3 flex items-center justify-center">
            <CheckCircleIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <div className="ml-4 font-bold text-xl">30</div>
            <div className="ml-4 text-sm">Completed Courses</div>
          </div>
        </div>

        {visible && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center">
            <div className="bg-white rounded-full p-3 flex items-center justify-center">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <div className="ml-4 font-bold text-xl">30</div>
              <span className="ml-4 text-sm">Total Students</span>
            </div>
          </div>
        )}
      </div>

      {visible && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">My Courses</h2>
          <CoursesList />
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;

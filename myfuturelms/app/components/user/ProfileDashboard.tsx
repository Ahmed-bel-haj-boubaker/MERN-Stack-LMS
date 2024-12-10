import {
  BanknotesIcon,
  BookOpenIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import CoursesList from "../instructor/CoursesList";

const ProfileDashboard = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-x-7 gap-y-7">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center justify-start">
          <div className="bg-white rounded-full p-3 flex items-center justify-center">
            <BanknotesIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <div className="ml-4 font-bold">30</div>
            <span className="ml-4">Total Earning</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center">
          <div className="bg-white rounded-full p-3 flex items-center justify-center">
            <BookOpenIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <div className="ml-4 font-bold">30</div>
            <div className="ml-4">Courses</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center">
          <div className="bg-white rounded-full p-3 flex items-center justify-center">
            <AcademicCapIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <div className="ml-4 font-bold">30</div>
            <span className="ml-4">Enrolled Courses</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center">
          <div className="bg-white rounded-full p-3 flex items-center justify-center">
            <PlayCircleIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <div className="ml-4 font-bold">30</div>
            <div className="ml-4">Active Courses</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center">
          <div className="bg-white rounded-full p-3 flex items-center justify-center">
            <CheckCircleIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <div className="ml-4 font-bold">30</div>
            <div className="ml-4">Completed Courses</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-lg flex items-center">
          <div className="bg-white rounded-full p-3 flex items-center justify-center">
            <UserGroupIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <div className="ml-4 font-bold">30</div>
            <span className="ml-4">Total Students</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">My Courses</h2>
        <CoursesList />
      </div>
    </div>
  );
};

export default ProfileDashboard;

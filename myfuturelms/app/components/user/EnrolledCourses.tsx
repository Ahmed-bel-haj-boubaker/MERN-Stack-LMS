import useGetEnrolledCourses from "@/app/hooks/courses/useGetEnrolledCourses";
import CourseCard from "../CourseCard";

const EnrolledCourses = () => {
  const { courses } = useGetEnrolledCourses("enrolled");

  return (
    <div className="bg-gray-50  p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 mt-9">Enrolled Courses</h2>
      <div className="flex flex-wrap mt-6">
        {courses.map((c) => (
          <div key={c._id} className="w-1/3 p-2">
            <CourseCard
              category={c.courseId.category.name}
              courseName={c.courseId.name}
              enrolled={true}
              instructor={c.courseId.instructor.username}
              rating={c.courseId.ratings}
              id={c.courseId._id}
              progress={c.progress}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;

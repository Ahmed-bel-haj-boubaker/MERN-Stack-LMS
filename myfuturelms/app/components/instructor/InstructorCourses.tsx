import useGetInstructorCourses from "@/app/hooks/courses/useGetInstructorCourses";
import CourseCard from "../CourseCard";

const InstructorCourses = () => {
  const { courses } = useGetInstructorCourses();

  // Calculate the total video time for each course
  const videoLengths = courses.map((course) => {
    const totalSeconds = course.courseData.reduce(
      (total, video) => total + video.videoLength,
      0
    );
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`; // Time formatted as "Xh Ym"
  });

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 mt-9">Courses</h2>
      <div className="flex flex-wrap">
        {courses.map((c, index) => (
          <div key={c._id} className="w-1/3 p-2">
            <CourseCard
              category={c.category.name}
              courseName={c.name}
              instructor={c.instructor.username}
              price={c.price}
              rating={c.ratings}
              id={c._id}
              progress={c.progress}
              createdByinstructor={true}
              students={c.students}
              time={videoLengths[index]} // Pass the specific time for this course
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorCourses;

const Stats = () => {
  return (
    <div className="bg-[#1f1a63] rounded-2xl shadow-lg p-6 md:p-8 my-8 md:my-12 max-w-7xl xl:mx-auto max-lg:m-5 lg:m-5  ">
      <div className="grid grid-cols-2 lg:flex justify-around items-center text-white text-center gap-6 sm:gap-8 lg:gap-0">
        <div className="flex flex-col items-center flex-1">
          <h3 className="text-4xl md:text-5xl font-extrabold">
            45K<span className="text-white">+</span>
          </h3>
          <p className="mt-2 text-base md:text-lg font-medium">
            Active Students
          </p>
        </div>

        <div className="flex flex-col items-center flex-1">
          <h3 className="text-4xl md:text-5xl font-extrabold">
            89<span className="text-white">+</span>
          </h3>
          <p className="mt-2 text-base md:text-lg font-medium">
            Faculty Courses
          </p>
        </div>

        <div className="flex flex-col items-center flex-1">
          <h3 className="text-4xl md:text-5xl font-extrabold">
            156K<span className="text-white">+</span>
          </h3>
          <p className="mt-2 text-base md:text-lg font-medium">
            Best Professors
          </p>
        </div>

        <div className="flex flex-col items-center flex-1">
          <h3 className="text-4xl md:text-5xl font-extrabold">
            42K<span className="text-white">+</span>
          </h3>
          <p className="mt-2 text-base md:text-lg font-medium">
            Award Achieved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;

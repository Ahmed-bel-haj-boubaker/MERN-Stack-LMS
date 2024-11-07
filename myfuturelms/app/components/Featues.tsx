import {
  FaChalkboardTeacher,
  FaBook,
  FaCertificate,
  FaEnvelope,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaChalkboardTeacher className="text-4xl text-indigo-200" />,
      title: "Learn with Experts",
      description: "Curate learning content with experts to reach your goals.",
    },
    {
      icon: <FaBook className="text-4xl text-indigo-200" />,
      title: "Learn Anything",
      description: "Explore a wide range of topics and expand your knowledge.",
    },
    {
      icon: <FaCertificate className="text-4xl text-indigo-200" />,
      title: "Get Online Certificate",
      description: "Earn certifications to showcase your achievements.",
    },
    {
      icon: <FaEnvelope className="text-4xl text-indigo-200" />,
      title: "E-mail Marketing",
      description: "Stay updated with our latest courses and tips.",
    },
  ];

  return (
    <div className="bg-indigo-900 text-white py-16 px-4">
      {/* Header Section */}
      <div className="text-center mb-10">
        <button className="bg-indigo-200 text-indigo-900 px-4 py-2 rounded-full font-semibold text-sm uppercase mb-4">
          How We Start Journey
        </button>
        <h2 className="text-3xl font-bold mb-2">
          Start Your Learning Journey Today!
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Groove’s intuitive shared inbox makes team members work together,
          organize, prioritize, and communicate.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-gray-400 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Bottom Cards Section */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="bg-white text-indigo-900 p-6 rounded-lg shadow-md flex items-center space-x-4 max-w-sm md:max-w-none md:flex-1">
          <div>
            <img
              src="https://via.placeholder.com/100"
              alt="Instructor"
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Become an Instructor</h3>
            <p className="text-gray-600 mt-1">
              Join us to share your knowledge and make an impact.
            </p>
            <button className="mt-4 bg-indigo-900 text-white py-2 px-4 rounded-full font-semibold">
              Apply Now
            </button>
          </div>
        </div>

        <div className="bg-white text-indigo-900 p-6 rounded-lg shadow-md flex items-center space-x-4 max-w-sm md:max-w-none md:flex-1">
          <div>
            <img
              src="https://via.placeholder.com/100"
              alt="Student"
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Become a Student</h3>
            <p className="text-gray-600 mt-1">
              Join millions around the world in online learning.
            </p>
            <button className="mt-4 bg-indigo-900 text-white py-2 px-4 rounded-full font-semibold">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

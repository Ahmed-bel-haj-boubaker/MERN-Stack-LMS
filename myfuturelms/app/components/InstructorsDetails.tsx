import Image from "next/image";
import Avatar from "../../public/images/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

interface IinstuctorDetails {
  instructorName: string;
  instructorJob: string;
  facebookUser: string;
  instagramUser: string;
  linkedinUser: string;
}
const InstructorsDetails: React.FC<IinstuctorDetails> = ({
  instagramUser,
  facebookUser,
  instructorJob,
  instructorName,
  linkedinUser,
}) => {
  return (
    <div className="flex justify-center items-center space-x-7 mt-6 max-w-4xl mx-auto bg-white border border-gray-300 shadow-2xl p-6 rounded-xl max-lg:flex-col ">
      <div>
        <Image src={Avatar} alt="instructor" />
      </div>
      <div className=" max-lg:mt-8 max-lg:flex-col max-lg:flex ">
        <h2 className=" max-lg:text-center text-2xl text-[#161439] font-semibold ">
          {instructorName}
        </h2>
        <p className="text-lg  max-lg:text-center font-poppins text-gray-500 mb-3 uppercase">
          {instructorJob}
        </p>

        <p className="font-poppins">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          deserunt quaerat voluptates asperiores, provident labore laboriosam
          quisquam quam ab exercitationem, inventore consectetur, totam eaque.
          Fugiat pariatur vitae laboriosam ducimus quisquam.
        </p>
        <div className="flex items-center space-x-3  mt-4 max-lg:justify-center">
          {instagramUser && (
            <a
              href={instagramUser}
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
          )}

          {facebookUser && (
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
          )}

          {linkedinUser && (
            <a
              href="/"
              className="text-gray-600 transition duration-300 ease-in-out hover:bg-deep-purple-500 hover:text-white hover:bg-blue-800 hover:shadow-lg rounded-full border border-gray-600 p-3 flex items-center justify-center"
              style={{
                width: "35px",
                height: "35px",
              }}
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorsDetails;

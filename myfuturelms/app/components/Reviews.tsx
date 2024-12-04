import Image from "next/image";
import Avatar from "../../public/images/avatar.png";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IReviews } from "../types/CourseTypes";

const Reviews: React.FC<IReviews> = ({ reviews, ratings }) => {
  const ratingCounts = [0, 0, 0, 0, 0];

  reviews.forEach((review) => {
    const rating = Math.floor(review.rating);

    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1] += 1;
    }
  });

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-300 shadow-2xl p-6 mt-7 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 max-lg:text-center">Reviews</h2>
      <div className="flex xl:items-start space-x-6 max-lg:flex-col max-lg:space-y-6  ">
        <div className="flex flex-col items-center p-4 rounded-lg shadow max-lg:justify-center max-lg:w-full md:px-6 bg-white">
          <h1 className="text-4xl font-bold text-[#161439]">
            {ratings.toFixed(1)}
          </h1>
          <div className="flex text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => {
              if (i < Math.floor(ratings)) {
                return <FaStar key={i} className="text-yellow-400" />;
              } else if (i < ratings) {
                return <FaStarHalfAlt key={i} className="text-yellow-400" />;
              } else {
                return <FaRegStar key={i} className="text-gray-400" />;
              }
            })}
          </div>
          <p className="text-gray-500 text-sm mt-2">{reviews.length} Ratings</p>
        </div>

        <div className="flex-1   max-lg:justify-center max-lg:items-center">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-center mb-2 space-x-4 max-lg:space-x-2"
            >
              <div className="text-gray-700 font-medium w-6 flex items-center space-x-1">
                <div>{index + 1}</div>
                <div>
                  <FaStar key={index} className="text-yellow-400" />
                </div>
              </div>
              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-yellow-400 h-full"
                  style={{
                    width: `${(ratingCounts[index] / reviews.length) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="text-gray-500 ml-4">{ratingCounts[index]}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-6" />

      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div
            key={index}
            className="flex items-start  max-lg:flex-row space-x-4 mb-6 bg-gray-50 p-4 rounded-lg shadow max-lg:space-x-0 max-lg:space-y-4  "
          >
            <Image
              src={Avatar}
              alt={review.user.username}
              className="w-12 h-12 rounded-full mr-4"
            />

            <div className="flex-1  ">
              <div className="flex items-center justify-between ">
                <h3 className="font-bold text-lg text-gray-500">
                  {review.user.username}
                </h3>
                <div className="text-yellow-400 flex max-lg:mb-2">
                  {[...Array(5)].map((_, i) => {
                    if (i < Math.floor(review.rating)) {
                      return <FaStar key={i} className="text-yellow-400" />;
                    } else if (i < review.rating) {
                      return (
                        <FaStarHalfAlt key={i} className="text-yellow-400" />
                      );
                    } else {
                      return <FaRegStar key={i} className="text-gray-400" />;
                    }
                  })}
                </div>
              </div>

              <p className="text-gray-800 mt-2">{review.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;

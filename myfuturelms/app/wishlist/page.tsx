"use client";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeFromFavorite } from "../redux/favoriteSlices/favoriteSlice";
import { addToCart } from "../redux/cartSlices/cartSlice";

const Favorite: React.FC = () => {
  const coursesInFavorite = useAppSelector(
    (state) => state.favorite.favoriteArr
  );

  console.log(coursesInFavorite);
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.cart.error);
  const handleRemoveCourse = (courseId: string) => {
    dispatch(removeFromFavorite(courseId));
  };

  const pushTocart = (courseId: string) => {
    const findedCourse = coursesInFavorite.find((e) => e.id === courseId);

    if (findedCourse) {
      dispatch(addToCart(findedCourse));
      if (error) {
        alert(error);
      }
    }
  };

  if (coursesInFavorite.length === 0) {
    return (
      <div className="text-center text-lg font-semibold text-gray-600 flex flex-col mt-14">
        Your Wishlist is Empty
        <div className="mt-5 mb-24">
          <Button text="Navigate to Courses" href="courses" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-around">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2 p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-gray-600 font-medium">Product</th>
                  <th className="p-3 text-gray-600 font-medium">Price</th>
                  <th className="p-3 text-gray-600 font-medium">Add To Cart</th>
                  <th className="p-3 text-gray-600 font-medium">Remove</th>
                </tr>
              </thead>
              <tbody>
                {coursesInFavorite.map((course) => (
                  <tr
                    key={course.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{course.courseName}</td>
                    <td className="p-3">${course.price.toFixed(2)}</td>
                    <td className="p-3">
                      <Button
                        text="Add To Cart"
                        onClicks={() => pushTocart(course.id)}
                      />
                    </td>
                    <td className="p-3">
                      <button
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => handleRemoveCourse(course.id)}
                      >
                        <FontAwesomeIcon icon={faX} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;

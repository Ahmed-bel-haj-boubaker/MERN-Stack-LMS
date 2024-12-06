"use client";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearCart, removeFromCart } from "../redux/cartSlices/cartSlice";

interface Course {
  courseName: string;
  courseId: string;
  quantity: number;
  price: number;
}

const Card: React.FC = () => {
  const [courseInCard, setCourseInCard] = useState<Course[]>([]);
  const coursesInCart = useAppSelector((state) => state.cart.cartArr);
  const totalprice = useAppSelector((state) => state.cart.totalPrice);
  console.log(totalprice);
  const dispatch = useAppDispatch();

  const handleRemoveCourse = (courseId: string) => {
    dispatch(removeFromCart(courseId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleApplyCoupon = () => {
    alert("Coupon applied!");
  };

  const subtotal = coursesInCart.reduce((acc, course) => acc + course.price, 0);

  if (coursesInCart.length === 0) {
    return (
      <div className="text-center text-lg font-semibold text-gray-600">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="flex justify-around">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-gray-600 font-medium">Product</th>

                  <th className="p-3 text-gray-600 font-medium">Subtotal</th>
                  <th className="p-3 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coursesInCart.map((course) => (
                  <tr
                    key={course.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{course.courseName}</td>
                    <td className="p-3">${course.price.toFixed(2)}</td>

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
            <div className="flex justify-between items-center mt-16">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button text="Apply Coupon" />
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Cart Totals */}
          <div className=" p-3 flex flex-col items-center">
            <div className="flex flex-col  mb-4 text-gray-600  w-full">
              <div className="font-semibold">Total:</div>
              <div className="text-3xl text-black font-bold">
                ${subtotal.toFixed(2)}
              </div>
            </div>
            <Button text="Proceed To Checkout" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

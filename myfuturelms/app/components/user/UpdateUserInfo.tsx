import React, { useState } from "react";
import Button from "../Button";
import apiClient from "@/app/Api/ApiClient";
import toast, { Toaster } from "react-hot-toast";
import { IUser } from "@/app/types/UserTypes";

interface IUpdateUser {
  user: IUser;
  success: boolean;
}
const UpdateUserInfo: React.FC<IUpdateUser> = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    facebookLink: "",
    instagramLink: "",
    linkedinLink: "",
    twitterLink: "",
    job: "",
    biography: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await apiClient.patch<IUpdateUser>("update-user-info", {
      username: formData.username,
      email: formData.email,
      facebookLink: formData.facebookLink,
      instagramLink: formData.instagramLink,
      linkedinLink: formData.linkedinLink,
      twitterLink: formData.twitterLink,
      job: formData.job,
      biography: formData.biography,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      skills: formData.skills,
    });
    if (response.data?.success) {
      toast.success("User information updated successfully!");
    } else {
      toast.error("Failed to update user information. Please try again.");
    }
  };

  return (
    <div className="  shadow-md  mx-auto mt-10 bg-gray-50 p-6 rounded-lg border">
      <Toaster containerStyle={{ position: "fixed" }} />

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Update Your Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Section */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="John"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Username and Email */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
          />
        </div>

        {/* Job Title */}
        <div>
          <label
            htmlFor="job"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            id="job"
            name="job"
            value={formData.job}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your current job"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1234567890"
          />
        </div>

        {/* Skills */}
        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills (comma-separated)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </div>

        {/* Biography */}
        <div>
          <label
            htmlFor="biography"
            className="block text-sm font-medium text-gray-700"
          >
            Biography
          </label>
          <textarea
            id="biography"
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a short bio about yourself..."
            rows={4}
          ></textarea>
        </div>

        {/* Social Media Links */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="facebookLink"
            value={formData.facebookLink}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Facebook URL"
          />
          <input
            type="text"
            name="instagramLink"
            value={formData.instagramLink}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Instagram URL"
          />
          <input
            type="text"
            name="linkedinLink"
            value={formData.linkedinLink}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="LinkedIn URL"
          />
          <input
            type="text"
            name="twitterLink"
            value={formData.twitterLink}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Twitter URL"
          />
        </div>

        <div className=" flex justify-center mt-9">
          <Button text="Update Information" onClicks={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default UpdateUserInfo;

import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Hero2 from "../components/Hero2";
import CoursesList from "../components/CoursesList";
import NewsLetter from "../components/NewsLetter";
import { Instructors } from "../components/Instructors";
import Faq from "../components/Faq";
import Features from "../components/Featues";

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* <Hero /> */}

      <Categories />
      {/*
      <div className="-mt-28">
        <Hero2 />
      </div>

      <div className="-mt-28">
        <CoursesList />
      </div>
      <div className="xl:-mt-24 mt-24">
        <NewsLetter />
      </div>
      <div className="xl:-mt-48 mt-10">
        <Instructors />
      </div>
      <div className="xl:-mt-2 mt-10">
        <Faq />
      </div>
      <div className="xl:-mt-2 mt-10">
        <Features />
      </div> */}
    </div>
  );
};

export default Home;

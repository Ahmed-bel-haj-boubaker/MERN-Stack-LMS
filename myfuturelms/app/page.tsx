import Categories from "./components/Categories";
import CourseCard from "./components/CourseCard";
import CoursesList from "./components/CoursesList";
import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
import { Instructors } from "./components/Instructors";
import NewsLetter from "./components/NewsLetter";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Hero />

      <Categories />

      <div className="-mt-28">
        <Hero2 />
      </div>

      <div className="-mt-28">
        <CoursesList />
      </div>
      <div className="xl:-mt-48 mt-24">
        <NewsLetter />
      </div>
      <div className="xl:-mt-48 mt-10">
        <Instructors />
      </div>
    </div>
  );
}

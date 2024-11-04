import Categories from "./components/Categories";
import CourseCard from "./components/CourseCard";
import CoursesList from "./components/CoursesList";
import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Hero />

      <Categories />

      <div className="-mt-28">
        <Hero2 />
      </div>
      <CoursesList />
    </div>
  );
}

import { Course } from "@/app/types/CourseTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CoursesState {
  courses: Course[];
  totalCourses: number;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: CoursesState = {
  courses: [],
  totalCourses: 0,
  currentPage: 1,
  itemsPerPage: 9,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    setTotalCourses: (state, action: PayloadAction<number>) => {
      state.totalCourses = action.payload;
    },
  },
});

export const { addCourse, setCurrentPage, setCourses, setTotalCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;

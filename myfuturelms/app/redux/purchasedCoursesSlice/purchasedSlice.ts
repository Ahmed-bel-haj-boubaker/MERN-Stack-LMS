import { Course } from "@/app/types/CourseTypes";
import { createSlice } from "@reduxjs/toolkit";

interface CoursesState {
  purchasedArr: Course[];
}

const initialState: CoursesState = {
  purchasedArr: [],
};

const purchasedSlice = createSlice({
  name: "purchasedSlice",
  initialState,
  reducers: {
    addToPurchasedCourses: (state, action) => {
      const course = action.payload;
      console.log("Current state:", course);

      if (state.purchasedArr) {
        state.purchasedArr.push(course);
      } else {
        console.error("purchasedArr is not initialized.");
      }
    },
  },
});

export const { addToPurchasedCourses } = purchasedSlice.actions;
export default purchasedSlice.reducer;

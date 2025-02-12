import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Course {
  courseName: string;
  id: string;
  instructor: string;
  category: string;
  rating: number;
  price: number;
}

interface Favorite {
  favoriteArr: Course[];
  total: number;
  error: string | null;
}

const initialState: Favorite = {
  favoriteArr: [],
  total: 0,
  error: null,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<Course>) => {
      const courseId = action.payload.id;

      const courseInFavorite = state.favoriteArr.find(
        (course) => course.id === courseId
      );

      if (courseInFavorite) {
        state.error = "This Course Already Exists";
      } else {
        state.error = null;
        state.favoriteArr.push(action.payload);
        state.total += 1;
      }
    },

    removeFromFavorite: (state, action) => {
      const id = action.payload;
      const courseInFavorite = state.favoriteArr.find((c) => c.id === id);
      if (courseInFavorite) {
        state.favoriteArr = state.favoriteArr.filter(
          (course) => course.id !== action.payload
        );
        state.total -= 1;
        state.error = null;
      } else {
        console.log("Course not found in cart");
      }
    },

    clearFavorite: (state) => {
      state.favoriteArr = [];
      state.total = 0;
      state.error = null;
    },
  },
});

export const { addToFavorite, clearFavorite, removeFromFavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;

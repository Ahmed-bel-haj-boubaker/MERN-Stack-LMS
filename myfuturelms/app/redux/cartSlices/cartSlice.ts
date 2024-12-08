import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Course {
  courseName: string;
  id: string;
  instructor: string;
  category: string;
  rating: number;
  price: number;
}

interface Cart {
  cartArr: Course[];
  total: number;
  totalPrice: number;
  error: string | null;
}

const initialState: Cart = {
  cartArr: [],
  total: 0,
  totalPrice: 0,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Course>) => {
      const courseId = action.payload.id;

      const courseInCart = state.cartArr.find(
        (course) => course.id === courseId
      );

      if (courseInCart) {
        state.error = "This Course Already Exists";
      } else {
        state.error = null;
        state.cartArr.push(action.payload);
        state.total += 1;
        state.totalPrice += action.payload.price;
      }
    },

    removeFromCart: (state, action) => {
      console.log(action.payload);
      const id = action.payload;
      const courseInCart = state.cartArr.find((c) => c.id === id);
      if (courseInCart) {
        state.error = null;
        const price = courseInCart.price;
        state.total -= 1;
        state.totalPrice -= price;
        state.cartArr = state.cartArr.filter(
          (course) => course.id !== action.payload
        );
      } else {
        console.log("Course not found in cart");
      }
    },

    clearCart: (state) => {
      state.cartArr = [];
      state.total = 0;
      state.totalPrice = 0;
      state.error = null;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

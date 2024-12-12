import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import coursesReducer from "./courseSlices/courseSlice";
import cartReducer from "./cartSlices/cartSlice";
import favoriteReducer from "./favoriteSlices/favoriteSlice";
import purchasedCourseReducer from "./purchasedCoursesSlice/purchasedSlice";
const rootReducer = combineReducers({
  courses: coursesReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  purchasedCourse: purchasedCourseReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;

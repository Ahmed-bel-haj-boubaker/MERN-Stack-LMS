import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import coursesReducer from "./courseSlices/courseSlice";

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, coursesReducer);

const store = configureStore({
  reducer: {
    courses: persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;

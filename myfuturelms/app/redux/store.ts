import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import coursesReducer from "./courseSlices/courseSlice";

const persistConfig = {
  key: "root",
  storage: typeof window !== "undefined" ? storage : storage,
};

const persistedReducer = persistReducer(persistConfig, coursesReducer);

const store = configureStore({
  reducer: {
    courses: persistedReducer,
  },
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

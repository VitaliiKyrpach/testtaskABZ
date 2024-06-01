import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./catalogReducer";

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

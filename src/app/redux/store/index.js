import { configureStore } from "@reduxjs/toolkit";
import planetsReducer from "./planetsSlice";

export const store = configureStore({
  reducer: {
    planets: planetsReducer,
  },
});

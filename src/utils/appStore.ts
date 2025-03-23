import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import moviesReducer from "../features/movieSlice";
import gptReducer from "../features/gptSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    movies: moviesReducer,
    gpt: gptReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

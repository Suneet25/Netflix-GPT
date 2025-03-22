import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "./types";

const initialState: UserType | null = null;

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state) => {
      return null;
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    isGptSearch: false,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.isGptSearch = !state.isGptSearch;
    },
  },
});

export const { toggleGptSearch } = gptSlice.actions;
export default gptSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    upComingMovies: null,
    topRatedMovies: null,
    popularMovies: null,
    movieTrailer: null,
    gptSearchMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTopatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addUpcomingovies: (state, action) => {
      state.upComingMovies = action.payload;
    },
    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },
    addGptSearchMovies: (state, action) => {
      state.gptSearchMovies = action.payload;
    },
  },
});

export const {
  addPopularMovies,
  addTopatedMovies,
  addUpcomingovies,
  addNowPlayingMovies,
  addMovieTrailer,
  addGptSearchMovies,
} = movieSlice.actions;

export default movieSlice.reducer;

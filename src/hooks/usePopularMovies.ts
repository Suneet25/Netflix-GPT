import { useEffect } from "react";
import { TMDB_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../features/movieSlice";
import { URLS } from "../utils/urls";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = async () => {
    await fetch(URLS.NOW_PLAYING_MOVIES("popular"), TMDB_OPTIONS)
      .then((res) => res.json())
      .then((res) => dispatch(addPopularMovies(res.results)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    popularMovies();
  }, []);
};

export default usePopularMovies;

import { useEffect } from "react";
import { TMDB_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopatedMovies } from "../features/movieSlice";
import { URLS } from "../utils/urls";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = async () => {
    await fetch(URLS.NOW_PLAYING_MOVIES("top_rated"), TMDB_OPTIONS)
      .then((res) => res.json())
      .then((res) => dispatch(addTopatedMovies(res.results)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    topRatedMovies();
  }, []);
};

export default useTopRatedMovies;

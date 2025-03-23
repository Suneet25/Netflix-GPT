import { useEffect } from "react";
import { TMDB_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptSearchMovies } from "../features/movieSlice";
import { URLS } from "../utils/urls";

const useGPTSearchMovies = (title: string) => {
  const dispatch = useDispatch();
  const gptSearchMovies = async () => {
    await fetch(URLS.SEARCH_MOVIE_BY_TITLE(title), TMDB_OPTIONS)
      .then((res) => res.json())
      .then((res) => dispatch(addGptSearchMovies(res.results)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    gptSearchMovies();
  }, []);
};

export default useGPTSearchMovies;

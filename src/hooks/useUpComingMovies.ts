import { useEffect } from "react";
import { TMDB_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingovies } from "../features/movieSlice";
import { URLS } from "../utils/urls";

const useUpComingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = async () => {
    await fetch(URLS.NOW_PLAYING_MOVIES("upcoming"), TMDB_OPTIONS)
      .then((res) => res.json())
      .then((res) => dispatch(addUpcomingovies(res.results)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    upcomingMovies();
  }, []);
};

export default useUpComingMovies;

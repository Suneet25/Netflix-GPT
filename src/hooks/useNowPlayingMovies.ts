import { useEffect } from "react";
import { TMDB_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../features/movieSlice";
import { URLS } from "../utils/urls";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = async () => {
    await fetch(URLS.NOW_PLAYING_MOVIES("now_playing"), TMDB_OPTIONS)
      .then((res) => res.json())
      .then((res) => dispatch(addNowPlayingMovies(res.results)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    nowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;

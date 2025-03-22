import { useEffect } from "react";
import { TMDB_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../features/movieSlice";
import { URLS } from "../utils/urls";

type Props = { movie_id: number };

const useMovieTrailer = ({ movie_id }: Props) => {
  const dispatch = useDispatch();

  const fetchMovieTrailer = async () => {
    await fetch(URLS.MOVIE_TRAILER(movie_id), TMDB_OPTIONS)
      .then((res) => res.json())
      .then((res) => {
        const filteredMovies = res?.results?.filter(
          (movie) => movie.type === "Trailer"
        );
        const movieTrailer =
          filteredMovies?.length > 0 ? filteredMovies?.[0] : res?.results?.[0];
        dispatch(addMovieTrailer(movieTrailer));
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchMovieTrailer();
  }, []);
};

export default useMovieTrailer;

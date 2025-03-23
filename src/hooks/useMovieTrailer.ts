import { useEffect } from "react";
import { TMDB_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../features/movieSlice";
import { URLS } from "../utils/urls";

type Props = { movie_id: number };

const useMovieTrailer = ({ movie_id }: Props) => {
  const dispatch = useDispatch();

  const fetchMovieTrailer = async () => {
    const res = await fetch(URLS.MOVIE_TRAILER(movie_id), TMDB_OPTIONS);
    const jsonData = await res.json();
    const filteredMovies = jsonData?.results?.filter(
      (movie) => movie.type === "Trailer"
    );

    const movieTrailer =
      filteredMovies?.length > 0 ? filteredMovies?.[0] : jsonData?.results?.[0];
    if (movieTrailer) {
      dispatch(addMovieTrailer(movieTrailer));
    }
  };

  useEffect(() => {
    fetchMovieTrailer();
  }, [movie_id]);
};

export default useMovieTrailer;

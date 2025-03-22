import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";
import { RootState } from "../utils/appStore";
import MovieTrailer from "./MovieTrailer";
import MovieDetails from "./MovieDetails";
import MovieLists from "./MovieLists";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";

const Browse = () => {
  const movies = useSelector((state: RootState) => state?.movies);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  if (!movies) return;
  return (
    <div>
      <Header />
      <div className="">
        <MovieDetails movie={movies?.nowPlayingMovies?.[0]} />
        <MovieTrailer movie_id={movies?.nowPlayingMovies?.[0]?.id} />
      </div>
      <div className="bg-black">
        <div className="-mt-[250px] relative z-30 pl-10">
          <div className="flex flex-col gap-10">
            <MovieLists title="Now Playing" movies={movies?.nowPlayingMovies} />
            <MovieLists title="Upcoming" movies={movies?.upComingMovies} />
            <MovieLists title="Top Rated" movies={movies?.topRatedMovies} />
            <MovieLists title="Popular" movies={movies?.popularMovies} />
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <MovieLists title="Popular" movies={movies} />
<MovieLists title="Upcoming" movies={movies} /> */
}
export default Browse;

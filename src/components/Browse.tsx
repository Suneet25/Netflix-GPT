import Header from "./Header";
import { IMAGE_SOURCE } from "../utils/constants";
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import { RootState } from "../utils/appStore";
import MovieTrailer from "./MovieTrailer";
import MovieDetails from "./MovieDetails";
import MovieLists from "./MovieLists";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import { useState } from "react";
import GptForm from "./GptForm";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const movies = useSelector((state: RootState) => state?.movies);
  const isGptSearch = useSelector(
    (state: RootState) => state?.gpt?.isGptSearch
  );
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  if (!movies) return;
  return (
    <div>
      <Header />
      {isGptSearch ? (
        <div className="">
          <div className="fixed -z-10 h-full w-full">
            <img
              src={IMAGE_SOURCE?.NETFLIXGPT_BG_IMAGE}
              alt="bgImage"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="pt-[30%] md:pt-[7%] pb-[4%] w-full md:w-1/2 m-auto px-4 md:px-0">
            <GptForm
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          {!!movies?.gptSearchMovies && (
            <div className="bg-black mx-4 md:mx-10 rounded-md opacity-90 px-5 mb-10 py-10">
              {movies?.gptSearchMovies?.map((movie, index) => (
                <MovieLists
                  key={movie?.results?.[index]?.id}
                  title={movie?.results?.[index]?.title}
                  movies={movie?.results}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="">
            <MovieDetails movie={movies?.nowPlayingMovies?.[0]} />
            <MovieTrailer movie_id={movies?.nowPlayingMovies?.[0]?.id} />
          </div>
          <div className="bg-black">
            <div className="pt-10 md:pt-0 mt-0 md:-mt-[250px] relative z-30 pl-5 md:pl-10 ">
              <div className="flex flex-col gap-5 md:gap-10">
                <MovieLists
                  title="Now Playing"
                  movies={movies?.nowPlayingMovies}
                />
                <MovieLists title="Upcoming" movies={movies?.upComingMovies} />
                <MovieLists title="Top Rated" movies={movies?.topRatedMovies} />
                <MovieLists title="Popular" movies={movies?.popularMovies} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;

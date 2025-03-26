import React from "react";

const MovieDetails = ({ movie }) => {
  return (
    <div className="bg-gradient-to-r from-black aspect-video w-screen pt-16 pl-10 md:pt-46 md:pl-22 absolute z-30">
      <p className="font-medium text-white text-lg md:text-3xl mb-2 md:mb-5">
        {movie?.title}
      </p>
      <p className="w-1/2 md:w-1/4 text-white text-xs md:text-lg line-clamp-2 md:line-clamp-none">
        {movie?.overview}
      </p>
      <div className="flex items-center gap-4 mt-4 md:mt-10 ">
        <button className="px-2 py-1 md:px-3 md:py-2 rounded-md bg-white text-black font-semibold text-xs md:text-xl hover:opacity-70">
          Play
        </button>
        <button className="px-2 py-1 md:px-3 md:py-2 rounded-md bg-gray-500 text-white font-semibold text-xs md:text-xl">
          More Info
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;

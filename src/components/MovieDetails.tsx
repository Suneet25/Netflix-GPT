import React from "react";

const MovieDetails = ({ movie }) => {
  return (
    <div className=" bg-gradient-to-r from-black aspect-video w-screen pt-60 pl-22 absolute z-30">
      <p className="font-medium text-white text-3xl mb-5">{movie?.title}</p>
      <p className="w-1/4 text-white">{movie?.overview}</p>
      <div className="flex items-center gap-4 mt-10 ">
        <button className="px-3 py-2 rounded-md bg-white text-black font-semibold text-xl hover:opacity-70">
          Play
        </button>
        <button className="px-3 py-2 rounded-md bg-gray-500 text-white font-semibold text-xl">
          More Info
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;

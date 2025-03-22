import React, { useState } from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import { URLS } from "../utils/urls";

type Props = { movie_id: number };

const MovieTrailer = ({ movie_id }: Props) => {
  const MovieTrailer = useSelector(
    (state: RootState) => state?.movies?.movieTrailer
  );
  useMovieTrailer({ movie_id: movie_id });
  return (
    <div className="w-screen relative">
      <iframe
        className="w-screen aspect-video"
        src={URLS.YOTUBE_REDIRECTION(MovieTrailer?.key ?? "")}
        title="YouTube video player"
        allow=""
      ></iframe>
    </div>
  );
};

export default MovieTrailer;

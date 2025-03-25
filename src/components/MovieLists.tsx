import { IMAGE_CDN } from "../utils/constants";

const MovieLists = ({ title, movies }) => {
  return (
    <div>
      <p className="text-lg md:text-3xl font-semibold text-white mb-10">
        {title}
      </p>
      <div className="z-50 flex overflow-x-scroll no-scrollbar">
        <div className="flex gap-4 mb-5">
          {movies?.map((movie) => (
            <div
              key={movie?.id}
              className="w-[100px] lg:w-[200px] rounded-md  cursor-pointer"
            >
              <img
                loading="lazy"
                alt={movie?.id}
                src={`${IMAGE_CDN}${movie?.poster_path}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieLists;

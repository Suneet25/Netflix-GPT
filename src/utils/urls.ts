export const URLS = {
  NOW_PLAYING_MOVIES: (movieType: string) =>
    `https://api.themoviedb.org/3/movie/${movieType ?? "now_playing"}`,
  YOTUBE_REDIRECTION: (key: string) =>
    `https://www.youtube.com/embed/${key}?si=MNiXRaXkPqX10x9i&autoplay=1&mute=1&loop=1&controls=0&rel=0`,
  MOVIE_TRAILER: (movie_id: number) =>
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
};

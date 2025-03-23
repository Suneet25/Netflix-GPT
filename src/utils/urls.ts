export const URLS = {
  NOW_PLAYING_MOVIES: (movieType: string) =>
    `https://api.themoviedb.org/3/movie/${movieType ?? "now_playing"}`,
  YOTUBE_REDIRECTION: (key: string) =>
    `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${key}&loop=1&rel=0`,
  MOVIE_TRAILER: (movie_id: number) =>
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
  SEARCH_MOVIE_BY_TITLE: (title: string) =>
    `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&page=1`,
};

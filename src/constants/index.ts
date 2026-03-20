const ASSETS = {
  img: {
    tmdb: "https://image.tmdb.org/t/p/w500",
  },
  video: {
    youtube: "https://www.youtube.com/embed",
  },
};

const ROUTERS = {
  home: "/",
  movies: "/movies",
  movie: "/movie/:id",
  series: "/series",
  search: "/search",
  watchlist: "/watchlist",
  watch: "/watch/:id",
  watchTvShow: "/watch/tv-show/:id",
  upcoming: "/upcoming",
};

const SORT_OPTIONS_MOVIE = [
  { value: "popular", label: "Populares" },
  { value: "top_rated", label: "Mais bem avaliados" },
  { value: "upcoming", label: "Em breve" },
  { value: "now_playing", label: "Em cartaz" },
];

const SORT_OPTIONS_TV_SHOW = [
  { value: "popular", label: "Populares" },
  { value: "top_rated", label: "Mais votados" },
  { value: "airing_today", label: "Exibindo hoje" },
  { value: "on_the_air", label: "No ar" },
];

export const CONSTANTS = {
  ASSETS,
  ROUTERS,
  SORT_OPTIONS_MOVIE,
  SORT_OPTIONS_TV_SHOW,
};

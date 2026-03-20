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
  { value: "popularity.desc", label: "Popularidade (maior)" },
  { value: "popularity.asc", label: "Popularidade (menor)" },
  { value: "release_date.desc", label: "Data de lançamento (recente)" },
  { value: "release_date.asc", label: "Data de lançamento (antiga)" },
  { value: "vote_average.desc", label: "Avaliação (maior)" },
  { value: "vote_average.asc", label: "Avaliação (menor)" },
  { value: "vote_count.desc", label: "Votos (mais)" },
  { value: "vote_count.asc", label: "Votos (menos)" },
  { value: "original_title.asc", label: "Título (A-Z)" },
  { value: "original_title.desc", label: "Título (Z-A)" },
  { value: "revenue.desc", label: "Bilheteria (maior)" },
  { value: "revenue.asc", label: "Bilheteria (menor)" },
];

const SORT_OPTIONS_TV_SHOW = [
  { value: "popularity.desc", label: "Popularidade (maior)" },
  { value: "popularity.asc", label: "Popularidade (menor)" },
  { value: "first_air_date.desc", label: "Data de estreia (recente)" },
  { value: "first_air_date.asc", label: "Data de estreia (antiga)" },
  { value: "vote_average.desc", label: "Avaliação (maior)" },
  { value: "vote_average.asc", label: "Avaliação (menor)" },
  { value: "vote_count.desc", label: "Votos (mais)" },
  { value: "vote_count.asc", label: "Votos (menos)" },
  { value: "original_title.asc", label: "Título (A-Z)" },
  { value: "original_title.desc", label: "Título (Z-A)" },
];

export const CONSTANTS = {
  ASSETS,
  ROUTERS,
  SORT_OPTIONS_MOVIE,
  SORT_OPTIONS_TV_SHOW,
};

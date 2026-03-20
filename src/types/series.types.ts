export interface ISeriesDetails {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  episode_run_time: number[];
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  tagline: string;
  type: string;
  original_language: string;
  genres: { id: number; name: string }[];
  networks: { id: number; name: string; logo_path: string | null }[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  created_by: {
    id: number;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  seasons: ISeasonSummary[];
  credits?: {
    cast: ICastMember[];
    crew: ICrewMember[];
  };
}

export interface ISeasonSummary {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  air_date: string;
  episode_count: number;
}

export interface ISeasonDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  air_date: string;
  episodes: IEpisode[];
}

export interface IEpisode {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  episode_number: number;
  season_number: number;
  air_date: string;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
  crew: ICrewMember[];
  guests: ICastMember[];
}

export interface ICastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  known_for_department: string;
}

export interface ICrewMember {
  id: number;
  name: string;
  original_name: string;
  department: string;
  job: string;
  profile_path: string | null;
}

export interface ITVShow {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string; // pode converter para Date se quiser
  name: string;
  vote_average: number;
  vote_count: number;
}

export type SortByOption =
  | "popularity.asc"
  | "popularity.desc"
  | "first_air_date.asc"
  | "first_air_date.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc"
  | "original_title.asc"
  | "original_title.desc";

export interface DiscoverTVFilters {
  page?: number;
  sort_by?: SortByOption;
  with_genres?: string;
  without_genres?: string;
  with_companies?: string;
  without_companies?: string;
  with_networks?: number;
  with_watch_providers?: string;
  watch_region?: string;
  with_watch_monetization_types?: string;
  include_adult?: boolean;
  include_null_first_air_dates?: boolean;
  language?: string;
  first_air_date_year?: number;
  first_air_date_gte?: string;
  first_air_date_lte?: string;
  air_date_gte?: string;
  air_date_lte?: string;
  screened_theatrically?: boolean;
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
  vote_count_lte?: number;
  with_runtime_gte?: number;
  with_runtime_lte?: number;
  with_original_language?: string;
  with_keywords?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  with_status?: string;
  with_type?: string;
  with_origin_country?: string;
}

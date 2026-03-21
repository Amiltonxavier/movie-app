export interface IPaginationResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MultiSearchItem {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  poster_path: string | null;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  original_language?: string;
  genre_ids?: number[];
  popularity?: number;
  adult?: boolean;
  backdrop_path?: string | null;
}

export interface MultiSearchResponse {
  page: number;
  results: MultiSearchItem[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path?: string;
    backdrop_path?: string;
    genre_ids?: number[];
    popularity?: number;
    original_language?: string;
    original_title?: string;
    video?: boolean;
    adult?: boolean;
  }
  
  export interface DiscoverMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
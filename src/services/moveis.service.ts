import { API } from "../api/axios";
import type { IMovieDetails } from "../types/details-movie";
import type { DiscoverMoviesResponse } from "../types/movies.types";
import type { DiscoverMovieFilters } from "../types/discover-movie.types";
import type { Video } from "../types/video.types";
import type { MultiSearchResponse } from "../types/index.d";

class MovieServices {
  async list(
    query?: string,
    page = 1,
    sortBy = "popular",
  ): Promise<DiscoverMoviesResponse> {
    const endpoint = query
      ? "/search/movie"
      : `/movie${sortBy ? `/${sortBy}` : ""}`;
    const params = query
      ? { query, language: "pt-BR", page }
      : { language: "pt-BR", page };

    try {
      const response = await API.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar filmes. Tente novamente mais tarde.");
    }
  }

  async discover(filters: DiscoverMovieFilters): Promise<DiscoverMoviesResponse> {
    try {
      const params: Record<string, unknown> = {
        language: "pt-BR",
        include_adult: false,
        include_video: false,
        page: filters.page || 1,
        sort_by: filters.sort_by || "popularity.desc",
      };

      if (filters.with_genres) params.with_genres = filters.with_genres;
      if (filters.without_genres) params.without_genres = filters.without_genres;
      if (filters.with_cast) params.with_cast = filters.with_cast;
      if (filters.with_crew) params.with_crew = filters.with_crew;
      if (filters.with_companies) params.with_companies = filters.with_companies;
      if (filters.without_companies) params.without_companies = filters.without_companies;
      if (filters.with_watch_providers) params.with_watch_providers = filters.with_watch_providers;
      if (filters.watch_region) params.watch_region = filters.watch_region;
      if (filters.with_watch_monetization_types) params.with_watch_monetization_types = filters.with_watch_monetization_types;
      if (filters.certification_country) params.certification_country = filters.certification_country;
      if (filters.certification) params.certification = filters.certification;
      if (filters.certification_gte) params["certification.gte"] = filters.certification_gte;
      if (filters.certification_lte) params["certification.lte"] = filters.certification_lte;
      if (filters.primary_release_year) params.primary_release_year = filters.primary_release_year;
      if (filters.primary_release_date_gte) params["primary_release_date.gte"] = filters.primary_release_date_gte;
      if (filters.primary_release_date_lte) params["primary_release_date.lte"] = filters.primary_release_date_lte;
      if (filters.release_date_gte) params["release_date.gte"] = filters.release_date_gte;
      if (filters.release_date_lte) params["release_date.lte"] = filters.release_date_lte;
      if (filters.region) params.region = filters.region;
      if (filters.vote_average_gte !== undefined) params["vote_average.gte"] = filters.vote_average_gte;
      if (filters.vote_average_lte !== undefined) params["vote_average.lte"] = filters.vote_average_lte;
      if (filters.vote_count_gte !== undefined) params["vote_count.gte"] = filters.vote_count_gte;
      if (filters.vote_count_lte !== undefined) params["vote_count.lte"] = filters.vote_count_lte;
      if (filters.with_runtime_gte !== undefined) params["with_runtime.gte"] = filters.with_runtime_gte;
      if (filters.with_runtime_lte !== undefined) params["with_runtime.lte"] = filters.with_runtime_lte;
      if (filters.with_original_language) params.with_original_language = filters.with_original_language;
      if (filters.with_keywords) params.with_keywords = filters.with_keywords;
      if (filters.without_keywords) params.without_keywords = filters.without_keywords;
      if (filters.with_people) params.with_people = filters.with_people;
      if (filters.year) params.year = filters.year;

      const response = await API.get("/discover/movie", { params });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar filmes. Tente novamente mais tarde.");
    }
  }

  async listByGenre(
    genreId: number,
    page = 1,
    sortBy = "popularity.desc",
  ): Promise<DiscoverMoviesResponse> {
    try {
      const response = await API.get("/discover/movie", {
        params: {
          with_genres: genreId,
          sort_by: sortBy,
          language: "pt-BR",
          page,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        "Erro ao buscar filmes por gênero. Tente novamente mais tarde.",
      );
    }
  }

  async getVideo(movieId: number): Promise<Video[]> {
    try {
      const response = await API.get(`/movie/${movieId}/videos`, {
        params: { language: "pt-BR" },
      });
      return response.data.results;
    } catch (error) {
      throw new Error(
        "Erro ao buscar vídeos do filme. Tente novamente mais tarde.",
      );
    }
  }

  async getOne(movieId: number): Promise<IMovieDetails> {
    try {
      const response = await API.get(`/movie/${movieId}`, {
        params: { language: "pt-BR" },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        "Erro ao buscar detalhes do filme. Tente novamente mais tarde.",
      );
    }
  }

  async getUpcoming(page = 1): Promise<DiscoverMoviesResponse> {
    try {
      const response = await API.get("/movie/upcoming", {
        params: { language: "pt-BR", page },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        "Erro ao buscar filmes em cartaz. Tente novamente mais tarde.",
      );
    }
  }

  async getSimilar(movieId: number, page = 1): Promise<DiscoverMoviesResponse> {
    try {
      const response = await API.get(`/movie/${movieId}/similar`, {
        params: { language: "pt-BR", page },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        "Erro ao buscar filmes similares. Tente novamente mais tarde.",
      );
    }
  }

  async searchMulti(query: string, page = 1): Promise<MultiSearchResponse> {
    try {
      const response = await API.get("/search/multi", {
        params: { query, language: "pt-BR", page },
      });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar. Tente novamente mais tarde.");
    }
  }
}

export const movieServices = new MovieServices();

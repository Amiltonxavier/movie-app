import { API } from "../api/axios";
import type { Video } from "../types/video.types";
import type {
  ISeriesDetails,
  ISeasonDetails,
  ITVShow,
} from "../types/series.types";
import { IPaginationResponse } from "../types";
import type { DiscoverTVFilters } from "../types/discover-tv.types";

class SeriesServices {
  async list(page = 1, sortBy = "popular", genreId?: number) {
    try {
      const params: Record<string, string | number> = {
        language: "pt-BR",
        page,
      };
      if (genreId) {
        params.with_genres = genreId;
      }
      const response = await API.get<IPaginationResponse<ITVShow>>(
        `/tv/${sortBy}`,
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar séries. Tente novamente mais tarde.");
    }
  }

  async discover(
    filters: DiscoverTVFilters,
  ): Promise<IPaginationResponse<ITVShow>> {
    try {
      const params: Record<string, unknown> = {
        language: "pt-BR",
        include_adult: false,
        include_null_first_air_dates: false,
        page: filters.page || 1,
        sort_by: filters.sort_by || "popularity.desc",
      };

      if (filters.with_genres) params.with_genres = filters.with_genres;
      if (filters.without_genres)
        params.without_genres = filters.without_genres;
      if (filters.with_companies)
        params.with_companies = filters.with_companies;
      if (filters.without_companies)
        params.without_companies = filters.without_companies;
      if (filters.with_networks) params.with_networks = filters.with_networks;
      if (filters.with_watch_providers)
        params.with_watch_providers = filters.with_watch_providers;
      if (filters.watch_region) params.watch_region = filters.watch_region;
      if (filters.with_watch_monetization_types)
        params.with_watch_monetization_types =
          filters.with_watch_monetization_types;
      if (filters.first_air_date_year)
        params.first_air_date_year = filters.first_air_date_year;
      if (filters.first_air_date_gte)
        params["first_air_date.gte"] = filters.first_air_date_gte;
      if (filters.first_air_date_lte)
        params["first_air_date.lte"] = filters.first_air_date_lte;
      if (filters.air_date_gte) params["air_date.gte"] = filters.air_date_gte;
      if (filters.air_date_lte) params["air_date.lte"] = filters.air_date_lte;
      if (filters.screened_theatrically !== undefined)
        params.screened_theatrically = filters.screened_theatrically;
      if (filters.vote_average_gte !== undefined)
        params["vote_average.gte"] = filters.vote_average_gte;
      if (filters.vote_average_lte !== undefined)
        params["vote_average.lte"] = filters.vote_average_lte;
      if (filters.vote_count_gte !== undefined)
        params["vote_count.gte"] = filters.vote_count_gte;
      if (filters.vote_count_lte !== undefined)
        params["vote_count.lte"] = filters.vote_count_lte;
      if (filters.with_runtime_gte !== undefined)
        params["with_runtime.gte"] = filters.with_runtime_gte;
      if (filters.with_runtime_lte !== undefined)
        params["with_runtime.lte"] = filters.with_runtime_lte;
      if (filters.with_original_language)
        params.with_original_language = filters.with_original_language;
      if (filters.with_keywords) params.with_keywords = filters.with_keywords;
      if (filters.without_keywords)
        params.without_keywords = filters.without_keywords;
      if (filters.without_watch_providers)
        params.without_watch_providers = filters.without_watch_providers;
      if (filters.with_status) params.with_status = filters.with_status;
      if (filters.with_type) params.with_type = filters.with_type;
      if (filters.with_origin_country)
        params.with_origin_country = filters.with_origin_country;

      const response = await API.get("/discover/tv", { params });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar séries. Tente novamente mais tarde.");
    }
  }

  async getOne(seriesId: number): Promise<ISeriesDetails> {
    try {
      const response = await API.get(`/tv/${seriesId}`, {
        params: { language: "pt-BR" },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        "Erro ao buscar detalhes da série. Tente novamente mais tarde.",
      );
    }
  }

  async getSeason(
    seriesId: number,
    seasonNumber: number,
  ): Promise<ISeasonDetails> {
    try {
      const response = await API.get(`/tv/${seriesId}/season/${seasonNumber}`, {
        params: { language: "pt-BR" },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        "Erro ao buscar detalhes da temporada. Tente novamente mais tarde.",
      );
    }
  }

  async getVideo(seriesId: number): Promise<Video[]> {
    try {
      const response = await API.get(`/tv/${seriesId}/videos`);
      return response.data.results;
    } catch (error) {
      throw new Error(
        "Erro ao buscar vídeos da série. Tente novamente mais tarde.",
      );
    }
  }

  async getSimilar(
    seriesId: number,
    page = 1,
  ): Promise<IPaginationResponse<ITVShow>> {
    try {
      const response = await API.get(`/tv/${seriesId}/similar`, {
        params: { language: "pt-BR", page },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        "Erro ao buscar séries similares. Tente novamente mais tarde.",
      );
    }
  }
}

export const seriesServices = new SeriesServices();

import { API } from "../api/axios";
import type { Video } from "../types/video.types";
import type {
  ISeriesDetails,
  ISeasonDetails,
  ITVShow,
} from "../types/series.types";
import { IPaginationResponse } from "../types";

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
      const response = await API.get(`/tv/${seriesId}/videos`, {
        params: { language: "pt-BR" },
      });
      return response.data.results;
    } catch (error) {
      throw new Error(
        "Erro ao buscar vídeos da série. Tente novamente mais tarde.",
      );
    }
  }

  async getSimilar(seriesId: number, page = 1): Promise<IPaginationResponse<ITVShow>> {
    try {
      const response = await API.get(`/tv/${seriesId}/similar`, {
        params: { language: "pt-BR", page },
      });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar séries similares. Tente novamente mais tarde.");
    }
  }
}

export const seriesServices = new SeriesServices();

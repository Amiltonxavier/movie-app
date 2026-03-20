import { API } from "../api/axios";
import type { IMovieDetails } from "../types/details-movie";
import type { DiscoverMoviesResponse } from "../types/movies.types";
import type { Video } from "../types/video.types";

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
}

export const movieServices = new MovieServices();

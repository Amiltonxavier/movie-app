import { API } from "../api/axios";

class GenreServices {
  async getMovieGenres(): Promise<{ genres: { id: number; name: string }[] }> {
    try {
      const response = await API.get("/genre/movie/list", {
        params: { language: "pt-BR" },
      });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar gêneros. Tente novamente mais tarde.");
    }
  }

  async getTvGenres(): Promise<{ genres: { id: number; name: string }[] }> {
    try {
      const response = await API.get("/genre/tv/list", {
        params: { language: "pt-BR" },
      });
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar gêneros. Tente novamente mais tarde.");
    }
  }
}

export const genreServices = new GenreServices();

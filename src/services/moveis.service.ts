import { API_BASE_URL, API_OPTIONS } from "../api/api"
import { DiscoverMoviesResponse } from "../types/movies.types";


export class MoveServices {

    async list(query?: string): Promise<DiscoverMoviesResponse> {
        const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; 
        try {
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            console.log(data); // Verifique a estrutura dos dados
            return data;
        } catch (error) {
            throw new Error('Error fetching movies. Please try again later.');
        }
    }
}
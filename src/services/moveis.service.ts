import { API_BASE_URL, API_OPTIONS } from "../api/api"
import { IMovieDetails } from "../types/details-movie";
import { DiscoverMoviesResponse } from "../types/movies.types";
import { Video } from "../types/video.types";


export class MovieServices {

    async list(query?: string): Promise<DiscoverMoviesResponse> {
        const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; 
        try {
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            
            return data;
        } catch (error) {
            throw new Error('Error fetching movies. Please try again later.');
        }
    }

    async getVideo(movieId: number): Promise<Video[]> {
        const endpoint = `${API_BASE_URL}/movie/${movieId}/videos`;
        try {
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error('Failed to fetch movie video');
            }
            const data = await response.json();
            
            return data.results;
        } catch (error) {
            throw new Error('Error fetching movie video. Please try again later.');
        }
    }

    async getMovieDetails(movieId: number): Promise<IMovieDetails | void> {
        const endpoint = `${API_BASE_URL}/movie/${movieId}`;
        try {
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching movie details. Please try again later.');
        }
    }
}
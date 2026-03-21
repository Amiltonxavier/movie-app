import { useQuery } from "@tanstack/react-query";
import { movieServices } from "../services/moveis.service";
import { getTrendingMovie } from "../lib/appwrite";
import type { DiscoverMovieFilters } from "../types/discover-movie.types";
import type { MultiSearchResponse } from "../types/index.d";

export const useGetMovies = (
  params?: string,
  page = 1,
  sortBy?: string,
  enabled = true,
) =>
  useQuery({
    queryKey: ["movie", params, page, sortBy],
    queryFn: async () => await movieServices.list(params, page, sortBy),
    enabled,
  });

export const useDiscoverMovies = (filters: DiscoverMovieFilters, enabled = true) =>
  useQuery({
    queryKey: ["discover-movies", filters],
    queryFn: async () => await movieServices.discover(filters),
    enabled,
  });

export const useGetMoviesByGenre = (
  genreId: number | null,
  page = 1,
  sortBy?: string,
  enabled = true,
) =>
  useQuery({
    queryKey: ["movie-genre", genreId, page, sortBy],
    queryFn: async () =>
      genreId
        ? await movieServices.listByGenre(genreId, page, sortBy)
        : await movieServices.list(undefined, page, sortBy),
    enabled,
  });

export const useGetTrendingMovies = (params?: string, enabled = true) =>
  useQuery({
    queryKey: ["trending", params],
    queryFn: async () => await getTrendingMovie(),
    enabled,
  });

export const useGetTrendingMoviesDetails = (movieIds: number[], enabled = true) =>
  useQuery({
    queryKey: ["trending-details", movieIds],
    queryFn: async () => {
      const results = await Promise.all(
        movieIds.map(id => movieServices.getOne(id))
      );
      return results;
    },
    enabled: enabled && movieIds.length > 0,
  });

export const useGetMovie = (movieId: number, enabled = true) =>
  useQuery({
    queryKey: ["movie", movieId],
    queryFn: async () => await movieServices.getOne(movieId),
    enabled,
  });

export const useGetVideo = (movieId: number, enabled = true) =>
  useQuery({
    queryKey: ["video", movieId],
    queryFn: async () => await movieServices.getVideo(movieId),
    enabled,
  });

export const useGetUpcomingMovies = (page = 1, enabled = true) =>
  useQuery({
    queryKey: ["upcoming-movies", page],
    queryFn: async () => await movieServices.getUpcoming(page),
    enabled,
  });

export const useGetSimilarMovies = (
  movieId: number,
  page = 1,
  enabled = true,
) =>
  useQuery({
    queryKey: ["similar-movies", movieId, page],
    queryFn: async () => await movieServices.getSimilar(movieId, page),
    enabled,
  });

export const useSearchMulti = (
  query: string,
  page = 1,
  enabled = true,
) =>
  useQuery<MultiSearchResponse>({
    queryKey: ["search-multi", query, page],
    queryFn: async () => await movieServices.searchMulti(query, page),
    enabled: enabled && query.length > 0,
  });

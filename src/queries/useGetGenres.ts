import { useQuery } from "@tanstack/react-query";
import { genreServices } from "../services/genre.service";

export const useGetMovieGenres = () =>
  useQuery({
    queryKey: ["movie-genres"],
    queryFn: async () => await genreServices.getMovieGenres(),
  });

export const useGetTvGenres = () =>
  useQuery({
    queryKey: ["tv-genres"],
    queryFn: async () => await genreServices.getTvGenres(),
  });

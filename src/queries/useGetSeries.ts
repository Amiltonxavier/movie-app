import { useQuery } from "@tanstack/react-query";
import { seriesServices } from "../services/series.service";
import type { DiscoverTVFilters } from "../types/discover-tv.types";

export const useGetSeries = (page = 1, sortBy = "popularity.desc", genreId?: number, enabled = true) =>
  useQuery({
    queryKey: ["series", page, sortBy, genreId],
    queryFn: async () => await seriesServices.list(page, sortBy, genreId),
    enabled,
  });

export const useDiscoverSeries = (filters: DiscoverTVFilters, enabled = true) =>
  useQuery({
    queryKey: ["discover-series", filters],
    queryFn: async () => await seriesServices.discover(filters),
    enabled,
  });

export const useGetSeriesDetails = (seriesId: number, enabled = true) =>
  useQuery({
    queryKey: ["series-details", seriesId],
    queryFn: async () => await seriesServices.getOne(seriesId),
    enabled,
  });

export const useGetSeriesSeason = (seriesId: number, seasonNumber: number, enabled = true) =>
  useQuery({
    queryKey: ["series-season", seriesId, seasonNumber],
    queryFn: async () => await seriesServices.getSeason(seriesId, seasonNumber),
    enabled,
  });

export const useGetSeriesVideo = (seriesId: number, enabled = true) =>
  useQuery({
    queryKey: ["series-video", seriesId],
    queryFn: async () => await seriesServices.getVideo(seriesId),
    enabled,
  });

export const useGetSimilarSeries = (seriesId: number, page = 1, enabled = true) =>
  useQuery({
    queryKey: ["similar-series", seriesId, page],
    queryFn: async () => await seriesServices.getSimilar(seriesId, page),
    enabled,
  });

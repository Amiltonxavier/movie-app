import { useNavigate } from "react-router-dom";
import { MovieCarousel } from "../../components/movie-carousel/movie-carousel";
import { TVShowCarousel } from "../../components/tv-show-carousel/tv-show-carousel";
import { HeroVideo } from "./components/hero-video";
import { HeroSkeleton } from "./components/hero-skeleton";
import { CarouselSkeleton } from "./components/carousel-skeleton";
import { CONSTANTS } from "../../constants";
import { useGetTrendingMovies, useDiscoverMovies, useGetTrendingMoviesDetails } from "../../queries/useGetMovie";
import { useDiscoverSeries } from "../../queries/useGetSeries";

export default function Home() {
    const navigate = useNavigate();
    const { data: trending, isLoading: trendingLoading } = useGetTrendingMovies();
    const { data: popularMovies, isLoading: popularLoading } = useDiscoverMovies({ page: 1, sort_by: "popularity.desc" });
    const { data: topRated, isLoading: topRatedLoading } = useDiscoverMovies({ page: 1, sort_by: "vote_average.desc", vote_count_gte: 500 });
    const { data: topRatedSeries, isLoading: topRatedSeriesLoading } = useDiscoverSeries({ page: 1, sort_by: "vote_average.desc", vote_count_gte: 500 });

    const trendingMovieIds = trending?.map(t => t.movie_id).filter((id): id is number => id !== undefined) || [];
    const { data: trendingDetails, isLoading: trendingDetailsLoading } = useGetTrendingMoviesDetails(trendingMovieIds);

    const heroMovies = trendingDetails?.length ? trendingDetails.slice(0, 5) : [];

    const isHeroLoading = trendingLoading || trendingDetailsLoading;
    const isTrendingLoading = trendingLoading;
    const isPopularLoading = popularLoading;
    const isTopRatedLoading = topRatedLoading;
    const isTopRatedSeriesLoading = topRatedSeriesLoading;

    return (
        <div className="flex flex-col h-full space-y-16 md:space-y-24">
            {isHeroLoading ? <HeroSkeleton /> : <HeroVideo movies={heroMovies} />}

            <div className="flex-1 px-0 md:px-8 relative z-40">
                {isTrendingLoading ? (
                    <CarouselSkeleton title="Filmes em Alta" />
                ) : (
                    <MovieCarousel
                        title="Filmes em Alta"
                        movies={trending || []}
                        isTrending={true}
                        linkToSeeAll={CONSTANTS.ROUTERS.movies}
                    />
                )}

                {isPopularLoading ? (
                    <CarouselSkeleton title="Filmes Populares" />
                ) : (
                    <MovieCarousel
                        title="🎬 Filmes Populares"
                        movies={popularMovies?.results?.slice(0, 10) || []}
                        linkToSeeAll={CONSTANTS.ROUTERS.movies}
                    />
                )}

                {isTopRatedLoading ? (
                    <CarouselSkeleton title="Mais bem avaliados" />
                ) : (
                    <MovieCarousel
                        title="Mais bem avaliados"
                        movies={topRated?.results?.slice(0, 10) || []}
                        linkToSeeAll={CONSTANTS.ROUTERS.movies}
                    />
                )}

                {isTopRatedSeriesLoading ? (
                    <CarouselSkeleton title="Séries Mais bem Avaliadas" />
                ) : (
                    <TVShowCarousel
                        title="Séries Mais bem Avaliadas"
                        shows={topRatedSeries?.results?.slice(0, 10) || []}
                        linkToSeeAll={CONSTANTS.ROUTERS.series}
                    />
                )}

                <div className="mb-12 flex justify-center px-4">
                    <button
                        type="button"
                        onClick={() => navigate(CONSTANTS.ROUTERS.movies)}
                        className="bg-slate-800 hover:bg-slate-700 px-6 md:px-8 py-3 rounded-full font-medium transition text-sm md:text-base"
                    >
                        Ver mais filmes
                    </button>
                </div>
            </div>
        </div>
    )
}

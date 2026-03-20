import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Info, Play, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { CONSTANTS } from "../../../constants";

interface HeroMovie {
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
    runtime?: number;
    poster_path?: string;
    backdrop_path?: string;
    genres?: { id: number; name: string }[];
}

interface HeroVideoProps {
    movies: HeroMovie[];
}

export function HeroVideo({ movies }: HeroVideoProps) {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentMovie = movies[currentIndex];

    useEffect(() => {
        if (movies.length <= 1) return;
        
        const interval = setInterval(() => {
            goToNext();
        }, 8000);

        return () => clearInterval(interval);
    }, [currentIndex, movies.length]);

    const goToNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length);
            setIsTransitioning(false);
        }, 500);
    };

    const goToPrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
            setIsTransitioning(false);
        }, 500);
    };

    const handleWatch = () => {
        if (currentMovie?.id) {
            navigate(`${CONSTANTS.ROUTERS.watch.replace(':id', String(currentMovie.id))}`);
        }
    };

    if (!currentMovie) return null;

    const releaseYear = currentMovie.release_date?.split('-')[0] || currentMovie.first_air_date?.split('-')[0];

    return (
        <section className="relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden">
            <div className="absolute inset-0">
                {movies.map((movie, index) => (
                    <div
                        key={movie.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentIndex 
                                ? 'opacity-100 z-10' 
                                : 'opacity-0 z-0'
                        }`}
                    >
                        {movie.backdrop_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title || movie.name}
                                className="object-cover w-full h-full"
                            />
                        ) : movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt={movie.title || movie.name}
                                className="object-cover w-full h-full"
                            />
                        ) : null}
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-20" />

            <button
                onClick={goToPrev}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all hover:scale-110 disabled:opacity-50"
                aria-label="Anterior"
                disabled={movies.length <= 1}
            >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all hover:scale-110 disabled:opacity-50"
                aria-label="Próximo"
                disabled={movies.length <= 1}
            >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 z-30 p-4 md:p-8 lg:p-12 max-w-3xl">
                <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className="px-2 md:px-3 py-1 bg-purple-600 text-white text-xs md:text-sm font-semibold rounded">
                            EM DESTAQUE
                        </span>
                        {currentMovie.genres?.slice(0, 2).map((genre) => (
                            <span key={genre.id} className="hidden sm:inline text-xs md:text-sm text-slate-300">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                        {currentMovie.title || currentMovie.name || "Filme em destaque"}
                    </h2>

                    <div className="flex items-center gap-3 md:gap-4 text-sm md:text-base">
                        <span className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                            <span className="font-semibold">{currentMovie.vote_average?.toFixed(1) || "?"}</span>
                        </span>
                        {releaseYear && (
                            <span className="text-slate-300">{releaseYear}</span>
                        )}
                        {currentMovie.runtime && (
                            <span className="hidden md:inline text-slate-300">
                                {currentMovie.runtime} min
                            </span>
                        )}
                    </div>

                    <p className="hidden md:block text-sm lg:text-base text-slate-200 line-clamp-2 max-w-xl">
                        {currentMovie.overview || "Sem descrição disponível."}
                    </p>

                    <div className="flex gap-2 md:gap-4 pt-2">
                        <button 
                            type="button" 
                            onClick={handleWatch}
                            disabled={!currentMovie?.id}
                            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 md:px-8 py-2 md:py-3 rounded-lg flex items-center gap-2 transition-all hover:scale-105 text-sm md:text-base font-semibold"
                        >
                            <Play className="w-4 h-4 md:w-5 md:h-5 fill-white" /> 
                            <span>Assistir</span>
                        </button>
                        <button 
                            type="button" 
                            onClick={handleWatch}
                            disabled={!currentMovie?.id}
                            className="bg-slate-700/80 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 md:px-6 py-2 md:py-3 rounded-lg flex items-center gap-2 transition-all hover:scale-105 text-sm md:text-base"
                        >
                            <Info className="w-4 h-4 md:w-5 md:h-5" /> 
                            <span className="hidden sm:inline">Detalhes</span>
                        </button>
                    </div>
                </div>
            </div>

            {movies.length > 1 && (
                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {movies.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (!isTransitioning) {
                                    setIsTransitioning(true);
                                    setTimeout(() => {
                                        setCurrentIndex(index);
                                        setIsTransitioning(false);
                                    }, 300);
                                }
                            }}
                            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'w-6 md:w-8 bg-purple-500' 
                                    : 'w-1.5 md:w-2 bg-white/50 hover:bg-white/70'
                            }`}
                            aria-label={`Ir para slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

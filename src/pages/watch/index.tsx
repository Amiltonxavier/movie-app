import { useParams } from 'react-router-dom'
import { useGetMovie, useGetVideo, useGetSimilarMovies } from '../../queries/useGetMovie';
import { Player } from '../../components/player';
import { Spinner } from '../../components/Spinner';
import { MovieCard } from '../../components/movie-card/movie-card';
import { Globe, Play, Calendar, Clock, Star, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Watch() {
    const { id } = useParams<{ id: string }>()
    const { data: movieData, isLoading: movieLoading } = useGetMovie(Number(id)) as any;
    const [showMore, setShowMore] = useState(false)

    const isMovie = !!movieData?.title;

    const { data: movieVideo, isLoading: isLoadingVideo } = useGetVideo(Number(id), isMovie);
    const { data: similar } = useGetSimilarMovies(Number(id));

    const video = movieVideo;
    const data = movieData;
    const isLoading = movieLoading;

    const tmdbUrl = `https://www.themoviedb.org/${isMovie ? 'movie' : 'tv'}/${id}`;
    const imdbUrl = data?.imdb_id ? `https://www.imdb.com/title/${data.imdb_id}` : null;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    const backdropUrl = data?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        : data?.poster_path
            ? `https://image.tmdb.org/t/p/original${data.poster_path}`
            : null;

    return (
        <div className='pb-16'>
            <div
                className="relative w-full aspect-video md:h-[500px] lg:h-[700px] overflow-hidden"
                style={{
                    backgroundImage: backdropUrl ? `url(${backdropUrl})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 backdrop-blur-[1px]" />

                <div className='relative w-full h-full flex items-end'>
                    <div className='w-full px-4 md:px-8 lg:px-16 pb-8 md:pb-12'>
                        <div className='max-w-3xl'>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 drop-shadow-lg">
                                {data?.title || data?.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-gray-200 mb-4">
                                <span className="flex items-center gap-1 text-green-400 font-semibold">
                                    <Star className="w-4 h-4 fill-green-400" />
                                    {data?.vote_average?.toFixed(1)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {data?.release_date || data?.first_air_date}
                                </span>
                                {isMovie && data?.runtime && (
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {data.runtime} min
                                    </span>
                                )}
                                {data?.adult && (
                                    <span className="px-1.5 py-0.5 bg-red-600 text-white text-xs font-bold rounded">18+</span>
                                )}
                            </div>

                            <p className={`text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-2xl ${showMore ? '' : 'line-clamp-3'}`}>
                                {data?.overview || 'Sem descrição disponível.'}
                            </p>

                            {data?.overview && data.overview.length > 200 && (
                                <button
                                    onClick={() => setShowMore(!showMore)}
                                    className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
                                >
                                    {showMore ? 'Mostrar menos' : 'Mais informações'}
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                                </button>
                            )}

                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={tmdbUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
                                >
                                    <Globe className="w-4 h-4" />
                                    TMDB
                                </a>
                                {imdbUrl && (
                                    <a
                                        href={imdbUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition"
                                    >
                                        <Play className="w-4 h-4 fill-current" />
                                        IMDb
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full px-4 md:px-8 lg:px-16 py-8'>
                <div className="">
                    {
                        isLoadingVideo && !video ?
                            <div className='w-full flex flex-col justify-center items-center aspect-video md:h-[500px] lg:h-[700px] rounded-xl md:rounded-2xl overflow-hidden mb-8'>
                                <Spinner />
                            </div>
                            :
                            <div className='w-full aspect-video md:h-[500px] lg:h-[700px] rounded-xl md:rounded-2xl overflow-hidden mb-8'>
                                {<Player video={video} />}
                            </div>


                    }


                    <div className='mb-12'>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Mais Detalhes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-3">Gêneros</h3>
                                <div className='flex flex-wrap gap-2'>
                                    {data?.genres?.map((genre: any) => (
                                        <span key={genre.id} className='bg-white/10 text-white px-3 py-1 rounded-full text-sm'>
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-3">Informações</h3>
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <span className="text-gray-400 text-sm">Idiomas:</span>
                                        <div className='flex flex-wrap gap-2 mt-1'>
                                            {data?.languages?.map((lang: string) => (
                                                <span key={lang} className='bg-purple-600/80 text-white px-2 py-0.5 rounded text-xs font-medium'>
                                                    {lang.toUpperCase()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {isMovie && data?.budget > 0 && (
                                        <div>
                                            <span className="text-gray-400 text-sm">Orçamento:</span>
                                            <p className="text-white font-medium">${data.budget.toLocaleString()}</p>
                                        </div>
                                    )}
                                    {isMovie && data?.revenue > 0 && (
                                        <div>
                                            <span className="text-gray-400 text-sm">Bilheteria:</span>
                                            <p className="text-white font-medium">${data.revenue.toLocaleString()}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-3">Produção</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-2">
                                    {[...(data?.networks || []), ...(data?.production_companies || [])].map((item: any) => (
                                        <span key={item.id} className="flex items-center gap-2 text-gray-300">
                                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                            {item.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {data?.credits?.cast && data.credits.cast.length > 0 && (
                        <div className='mb-12'>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Elenco</h2>
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {data.credits.cast.slice(0, 10).map((actor: any) => (
                                    <div key={actor.id} className="flex-shrink-0 w-24 md:w-28 text-center">
                                        {actor.profile_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                                alt={actor.name}
                                                className="w-full aspect-[2/3] object-cover rounded-lg mb-2"
                                            />
                                        ) : (
                                            <div className="w-full aspect-[2/3] bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                                                <span className="text-gray-500 text-xs">Sem foto</span>
                                            </div>
                                        )}
                                        <p className="text-white text-sm font-medium truncate">{actor.name}</p>
                                        <p className="text-gray-400 text-xs truncate">{actor.character}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='mb-8'>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Você também pode gostar</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                            {similar?.results.slice(0, 10).map((movie: any) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { useParams } from 'react-router-dom'
import { useGetMovie, useGetVideo, useGetSimilarMovies } from '../../queries/useGetMovie';
import { Player } from '../../components/player';
import { Spinner } from '../../components/Spinner';
import { MovieCard } from '../../components/movie-card/movie-card';
import { Globe, Play } from 'lucide-react';
import { InfoCard } from '../../components/info-card';

export default function Watch() {
    const { id } = useParams<{ id: string }>()
    const { data: movieData, isLoading: movieLoading } = useGetMovie(Number(id)) as any;

    const isMovie = !!movieData?.title;

    const { data: movieVideo } = useGetVideo(Number(id), isMovie);
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

    return (
        <div className='pb-16 flex flex-col items-center justify-center h-full gap-8 md:gap-12 px-4 md:px-8 lg:px-16'>
            <div className='w-full aspect-video md:h-[500px] lg:h-[700px] rounded-xl md:rounded-2xl overflow-hidden'>
                <Player video={video} />
            </div>

            <div className="p-4 md:p-6 lg:p-8 backdrop-blur-xl bg-white/70 rounded-lg shadow flex flex-col gap-3 md:gap-4 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{data?.title || data?.name}</h3>
                        <div className="text-sm md:text-base text-gray-700 flex flex-wrap items-center gap-2 mt-1">
                            <span>{data?.release_date || data?.first_air_date}</span>
                            <span>•</span>
                            {isMovie && <><span>{data?.adult ? "18+" : "Livre"}</span><span>•</span><span>{data?.runtime} min</span></>}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <a
                            href={tmdbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
                        >
                            <Globe className="w-4 h-4" />
                            TMDB
                        </a>
                        {imdbUrl && (
                            <a
                                href={imdbUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black text-sm rounded-lg transition"
                            >
                                <Play className="w-4 h-4 fill-current" />
                                IMDb
                            </a>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-2 text-gray-700">
                    <p className="flex-1 leading-normal text-sm md:text-base">{data?.overview}</p>
                    {data?.credits?.cast && data.credits.cast.length > 0 && (
                        <>
                            <div className="hidden md:block w-px bg-gray-200" />
                            <div className="md:w-1/3">
                                <h5 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">Elenco:</h5>
                                <p className="text-sm">{data.credits.cast.slice(0, 3).map((actor: any) => actor.name).join(', ')}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className='w-full p-4 md:p-8'>
                <h2 className='text-2xl md:text-3xl font-bold mb-4 md:mb-6'>{data?.title || data?.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <InfoCard title="Gêneros">
                        <ul className='flex items-center gap-2 flex-wrap'>
                            {data?.genres?.map((genre: any) => (
                                <li key={genre.id} className='bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs md:text-sm font-semibold border border-blue-100'>
                                    {genre.name}
                                </li>
                            ))}
                        </ul>
                    </InfoCard>

                    <InfoCard title="Informações">
                        <section>
                            <h4 className='font-bold text-gray-800 text-xs uppercase tracking-wider mb-2'>Idiomas:</h4>
                            <div className='flex flex-wrap gap-2'>
                                {data?.languages?.map((lang: string) => (
                                    <span key={lang} className='bg-gray-800 text-white px-2 py-0.5 rounded text-[10px] md:text-xs font-medium'>
                                        {lang.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </InfoCard>

                    <InfoCard title="Produção">
                        <div className="flex flex-col gap-4">
                            <ul className="text-sm text-gray-700 flex flex-wrap gap-x-4 gap-y-2">
                                {[...(data?.networks || []), ...(data?.production_companies || [])].map((item: any) => (
                                    <li key={item.id} className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                        <span className="font-medium">{item.name}</span>
                                    </li>
                                ))}
                            </ul>


                        </div>
                    </InfoCard>
                </div>
            </div>

            <div className='w-full'>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Você também pode gostar</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                    {similar?.results.slice(0, 10).map((movie: any) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>

        </div>
    )
}

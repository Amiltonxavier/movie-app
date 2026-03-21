import { useParams, useSearchParams } from 'react-router-dom'
import { useGetSeriesDetails, useGetSeriesSeason, useGetSeriesVideo, useGetSimilarSeries } from '../../../queries/useGetSeries'
import { Player } from '../../../components/player'
import { Spinner } from '../../../components/Spinner'
import { TVShowCard } from '../../../components/tv-show-card'
import { Globe, Play, Star, Calendar, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function WatchTvShow() {
    const { id } = useParams<{ id: string }>()
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedSeason = parseInt(searchParams.get('season') || '1', 10)
    const [showMore, setShowMore] = useState(false)

    const { data: seriesData, isLoading: seriesLoading } = useGetSeriesDetails(Number(id)) as any
    const { data: seriesVideo } = useGetSeriesVideo(Number(id), !!seriesData)
    const { data: seasonData } = useGetSeriesSeason(Number(id), selectedSeason, !!seriesData)
    const { data: similar } = useGetSimilarSeries(Number(id))

    const tmdbUrl = `https://www.themoviedb.org/tv/${id}`;
    const imdbUrl = seriesData?.imdb_id ? `https://www.imdb.com/title/${seriesData.imdb_id}` : null;
    const homepageUrl = seriesData?.homepage;

    if (seriesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    const backdropUrl = seriesData?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${seriesData.backdrop_path}`
        : seriesData?.poster_path
            ? `https://image.tmdb.org/t/p/original${seriesData.poster_path}`
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
                                {seriesData?.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-gray-200 mb-4">
                                <span className="flex items-center gap-1 text-green-400 font-semibold">
                                    <Star className="w-4 h-4 fill-green-400" />
                                    {seriesData?.vote_average?.toFixed(1)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {seriesData?.first_air_date}
                                </span>
                                <span>{seriesData?.number_of_seasons} temporada{seriesData?.number_of_seasons !== 1 ? 's' : ''}</span>
                                <span>{seriesData?.number_of_episodes} episódio{seriesData?.number_of_episodes !== 1 ? 's' : ''}</span>
                            </div>

                            <p className={`text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-2xl ${showMore ? '' : 'line-clamp-3'}`}>
                                {seriesData?.overview || 'Sem descrição disponível.'}
                            </p>

                            {seriesData?.overview && seriesData.overview.length > 200 && (
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
                                {homepageUrl && (
                                    <a
                                        href={homepageUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 bg-white/20 backdrop-blur-sm text-white font-semibold rounded hover:bg-white/30 transition"
                                    >
                                        <Globe className="w-4 h-4" />
                                        Site
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full px-4 md:px-8 lg:px-16 py-8'>
                <div className="">
                    <div className='w-full aspect-video md:h-[500px] lg:h-[700px] rounded-xl md:rounded-2xl overflow-hidden mb-8'>
                        <Player video={seriesVideo} />
                    </div>

                    <div className='mb-12'>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Mais Detalhes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-3">Gêneros</h3>
                                <div className='flex flex-wrap gap-2'>
                                    {seriesData?.genres?.map((genre: any) => (
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
                                            {seriesData?.languages?.map((lang: string) => (
                                                <span key={lang} className='bg-purple-600/80 text-white px-2 py-0.5 rounded text-xs font-medium'>
                                                    {lang.toUpperCase()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {seriesData?.episode_run_time?.[0] && (
                                        <div>
                                            <span className="text-gray-400 text-sm">Duração:</span>
                                            <p className="text-white font-medium">{seriesData.episode_run_time[0]} min por episódio</p>
                                        </div>
                                    )}
                                    {seriesData?.status && (
                                        <div>
                                            <span className="text-gray-400 text-sm">Status:</span>
                                            <p className="text-white font-medium">{seriesData.status}</p>
                                        </div>
                                    )}
                                    {seriesData?.type && (
                                        <div>
                                            <span className="text-gray-400 text-sm">Tipo:</span>
                                            <p className="text-white font-medium">{seriesData.type}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-3">Produção</h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                                        {[...(seriesData?.networks || []), ...(seriesData?.production_companies || [])].map((item: any) => (
                                            <span key={item.id} className="flex items-center gap-2 text-gray-300">
                                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                                {item.name}
                                            </span>
                                        ))}
                                    </div>
                                    {seriesData?.created_by?.length > 0 && (
                                        <div className="pt-2 border-t border-white/10">
                                            <span className="text-gray-400 text-sm">Criado por:</span>
                                            <p className="text-white font-medium">
                                                {seriesData.created_by.map((c: any) => c.name).join(', ')}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {seriesData?.credits?.cast && seriesData.credits.cast.length > 0 && (
                        <div className='mb-12'>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Elenco</h2>
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {seriesData.credits.cast.slice(0, 10).map((actor: any) => (
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

                    {seriesData?.seasons && seriesData.seasons.length > 0 && (
                        <div className='mb-12'>
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6'>
                                <h2 className="text-2xl md:text-3xl font-bold text-white">Temporadas</h2>
                                <select
                                    value={selectedSeason}
                                    onChange={(e) => {
                                        setSearchParams({ season: e.target.value })
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                    }}
                                    className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm border border-white/20"
                                >
                                    {seriesData.seasons.filter((s: any) => s.season_number > 0).map((season: any) => (
                                        <option key={season.id} value={season.season_number} className="bg-slate-800">
                                            {season.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {seasonData && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                    {seasonData.episodes?.map((episode: any) => (
                                        <div key={episode.id} className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition">
                                            {episode.still_path ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                                                    alt={episode.name}
                                                    className="w-full aspect-video object-cover"
                                                />
                                            ) : (
                                                <div className="w-full aspect-video bg-slate-800 flex items-center justify-center">
                                                    <span className="text-slate-500">Sem imagem</span>
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <h4 className="font-semibold text-white text-sm md:text-base mb-2">
                                                    <span className="text-purple-400">{episode.episode_number}.</span> {episode.name}
                                                </h4>
                                                <p className="text-gray-400 text-xs md:text-sm line-clamp-2 mb-2">
                                                    {episode.overview || 'Sem descrição disponível.'}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    {episode.air_date && <span>{episode.air_date}</span>}
                                                    {episode.runtime && <><span>•</span><span>{episode.runtime} min</span></>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className='mb-8'>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Você também pode gostar</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                            {similar?.results.slice(0, 10).map((show: any) => (
                                <TVShowCard key={show.id} movie={show} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

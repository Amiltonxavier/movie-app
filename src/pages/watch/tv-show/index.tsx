import { useParams, useSearchParams } from 'react-router-dom'
import { useGetSeriesDetails, useGetSeriesSeason, useGetSeriesVideo, useGetSimilarSeries } from '../../../queries/useGetSeries'
import { Player } from '../../../components/player'
import { Spinner } from '../../../components/Spinner'
import { TVShowCard } from '../../../components/tv-show-card'
import { Globe, Play } from 'lucide-react'
import { InfoCard } from '../../../components/info-card'

export default function WatchTvShow() {
    const { id } = useParams<{ id: string }>()
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedSeason = parseInt(searchParams.get('season') || '1', 10)

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

    return (
        <div className='pb-16 flex flex-col items-center justify-center h-full gap-8 md:gap-12 px-4 md:px-8 lg:px-16'>
            <div className='w-full aspect-video md:h-[500px] lg:h-[700px] rounded-xl md:rounded-2xl overflow-hidden'>
                <Player video={seriesVideo} />
            </div>

            <div className="p-4 md:p-6 lg:p-8 backdrop-blur-xl bg-white/70 rounded-lg shadow flex flex-col gap-3 md:gap-4 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{seriesData?.name}</h3>
                        <div className="text-sm md:text-base text-gray-700 flex flex-wrap items-center gap-2 mt-1">
                            <span>{seriesData?.first_air_date}</span>
                            <span>•</span>
                            <span>{seriesData?.number_of_seasons} temporada{seriesData?.number_of_seasons !== 1 ? 's' : ''}</span>
                            <span>•</span>
                            <span>{seriesData?.number_of_episodes} episódio{seriesData?.number_of_episodes !== 1 ? 's' : ''}</span>
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
                        {homepageUrl && (
                            <a
                                href={homepageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition"
                            >
                                <Globe className="w-4 h-4" />
                                Site
                            </a>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-2 text-gray-700">
                    <p className="flex-1 leading-normal text-sm md:text-base">{seriesData?.overview}</p>
                    {seriesData?.credits?.cast && seriesData.credits.cast.length > 0 && (
                        <>
                            <div className="hidden md:block w-px bg-gray-200" />
                            <div className="md:w-1/3">
                                <h5 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">Elenco:</h5>
                                <p className="text-sm">{seriesData.credits.cast.slice(0, 3).map((actor: any) => actor.name).join(', ')}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {seriesData?.seasons && seriesData.seasons.length > 0 && (
                <div className='w-full flex flex-col gap-4'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Temporadas</h2>
                        <select
                            value={selectedSeason}
                            onChange={(e) => {
                                setSearchParams({ season: e.target.value })
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                            className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto"
                        >
                            {seriesData.seasons.filter((s: any) => s.season_number > 0).map((season: any) => (
                                <option key={season.id} value={season.season_number}>
                                    {season.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {seasonData && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {seasonData.episodes?.map((episode: any) => (
                                <div key={episode.id} className="bg-white/70 rounded-lg overflow-hidden shadow">
                                    {episode.still_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                                            alt={episode.name}
                                            className="w-full aspect-video object-cover"
                                        />
                                    ) : (
                                        <div className="w-full aspect-video bg-slate-200 flex items-center justify-center">
                                            <span className="text-slate-500">Sem imagem</span>
                                        </div>
                                    )}
                                    <div className="p-3 md:p-4">
                                        <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                                            {episode.episode_number}. {episode.name}
                                        </h4>
                                        <p className="text-xs md:text-sm text-gray-600 mt-2 line-clamp-2">
                                            {episode.overview || 'Sem descrição disponível.'}
                                        </p>
                                        <div className="flex items-center gap-2 mt-3 text-xs md:text-sm text-gray-500">
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

            <div className='w-full p-4 md:p-8'>
                <h2 className='text-2xl md:text-3xl font-bold mb-4 md:mb-6'>{seriesData?.name}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">


                    <InfoCard title="Gêneros">
                        <ul className='flex items-center gap-2 flex-wrap'>
                            {seriesData?.genres?.map((genre: any) => (
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
                                {seriesData?.languages?.map((lang: string) => (
                                    <span key={lang} className='bg-gray-800 text-white px-2 py-0.5 rounded text-[10px] md:text-xs font-medium'>
                                        {lang.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {seriesData?.episode_run_time?.[0] && (
                            <section>
                                <h4 className='font-bold text-gray-800 text-xs uppercase tracking-wider'>Duração:</h4>
                                <p className="text-sm text-gray-600 font-medium">{seriesData.episode_run_time[0]} min por episódio</p>
                            </section>
                        )}

                        {seriesData?.status && (
                            <section>
                                <h4 className='font-bold text-gray-800 text-xs uppercase tracking-wider'>Status:</h4>
                                <p className="text-sm text-gray-600 font-medium">{seriesData.status}</p>
                            </section>
                        )}
                    </InfoCard>

                    <InfoCard title="Redes e Produção">
                        <div className="flex flex-col gap-4">
                            <ul className="text-sm text-gray-700 flex flex-wrap gap-x-4 gap-y-2">
                                {[...(seriesData?.networks || []), ...(seriesData?.production_companies || [])].map((item: any) => (
                                    <li key={item.id} className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                        <span className="font-medium">{item.name}</span>
                                    </li>
                                ))}
                            </ul>

                            {seriesData?.created_by?.length > 0 && (
                                <div className="pt-2 border-t border-gray-100">
                                    <h4 className='font-bold text-gray-800 text-xs uppercase tracking-wider mb-1'>Criado por:</h4>
                                    <p className="text-sm text-purple-600 font-semibold">
                                        {seriesData.created_by.map((c: any) => c.name).join(', ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </InfoCard>
                </div>

            </div>

            <div className='w-full '>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Você também pode gostar</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                    {similar?.results.slice(0, 10).map((show: any) => (
                        <TVShowCard key={show.id} movie={show} />
                    ))}
                </div>
            </div>

        </div>
    )
}

import { useParams, useSearchParams } from 'react-router-dom'
import { useGetSeriesDetails, useGetSeriesSeason, useGetSeriesVideo, useGetSimilarSeries } from '../../../queries/useGetSeries'
import { Player } from '../../../components/player'
import { Spinner } from '../../../components/Spinner'
import { MovieCard } from '../../../components/movie-card/movie-card'

export default function WatchTvShow() {
    const { id } = useParams<{ id: string }>()
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedSeason = parseInt(searchParams.get('season') || '1', 10)

    const { data: seriesData, isLoading: seriesLoading } = useGetSeriesDetails(Number(id)) as any
    const { data: seriesVideo } = useGetSeriesVideo(Number(id), !!seriesData)
    const { data: seasonData } = useGetSeriesSeason(Number(id), selectedSeason, !!seriesData)
    const { data: similar } = useGetSimilarSeries(Number(id))

    if (seriesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    return (
        <div className='pb-16 flex flex-col items-center justify-center h-full gap-12 px-16'>
            <div className='w-full h-[800px] rounded-2xl overflow-hidden'>
                <Player video={seriesVideo} />
            </div>

            <div className="p-6 md:p-8 backdrop-blur-xl bg-white/70 rounded-lg shadow flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-gray-900">{seriesData?.name}</h3>

                <div className="text-base text-gray-700 space-x-2">
                    <span>{seriesData?.first_air_date}</span>
                    <span>•</span>
                    <span>{seriesData?.number_of_seasons} temporada{seriesData?.number_of_seasons !== 1 ? 's' : ''}</span>
                    <span>•</span>
                    <span>{seriesData?.number_of_episodes} episódio{seriesData?.number_of_episodes !== 1 ? 's' : ''}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-2 text-gray-700">
                    <p className="flex-1 leading-normal">{seriesData?.overview}</p>
                    {seriesData?.credits?.cast && seriesData.credits.cast.length > 0 && (
                        <>
                            <div className="hidden md:block w-px bg-gray-200" />
                            <div className="md:w-1/3">
                                <h5 className="font-semibold text-gray-800 mb-1">Elenco:</h5>
                                <p>{seriesData.credits.cast.slice(0, 3).map((actor: any) => actor.name).join(', ')}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className='w-full flex flex-col gap-4'>
                <h2 className="text-4xl font-bold">Trailers</h2>
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {seriesVideo?.map((item: any) => (
                            <div key={item.id} className="group">
                                <div className="overflow-hidden rounded-lg mb-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-purple-900/20">
                                    <img
                                        src={`https://img.youtube.com/vi/${item.key}/0.jpg`}
                                        alt={item.name}
                                        width={300}
                                        height={400}
                                        className="object-cover w-full aspect-[2/3]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {seriesData?.seasons && seriesData.seasons.length > 0 && (
                <div className='w-full flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className="text-4xl font-bold">Temporadas</h2>
                        <select 
                            value={selectedSeason}
                            onChange={(e) => {
                                setSearchParams({ season: e.target.value })
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                            className="bg-slate-800 text-white px-4 py-2 rounded-lg"
                        >
                            {seriesData.seasons.filter((s: any) => s.season_number > 0).map((season: any) => (
                                <option key={season.id} value={season.season_number}>
                                    {season.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {seasonData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                    <div className="p-4">
                                        <h4 className="font-semibold text-gray-900">
                                            {episode.episode_number}. {episode.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                            {episode.overview || 'Sem descrição disponível.'}
                                        </p>
                                        <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
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

            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6'>{seriesData?.name}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 backdrop-blur-xl bg-white/70 rounded-lg shadow flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-gray-900">Gêneros</h3>
                        <ul className='flex items-center gap-2 flex-wrap'>
                            {seriesData?.genres?.map((genre: any) => (
                                <li key={genre.id} className='text-gray-700 font-semibold'>{genre.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-6 backdrop-blur-xl bg-white/70 rounded-lg shadow flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-gray-900">Informações</h3>

                        <h4 className='mt-4 font-semibold text-gray-800'>Idiomas:</h4>
                        <div className='flex flex-wrap gap-2'>
                            {seriesData?.languages?.map((lang: string) => (
                                <span key={lang} className='bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm'>
                                    {lang.toUpperCase()}
                                </span>
                            ))}
                        </div>

                        {seriesData?.episode_run_time?.length > 0 && (
                            <>
                                <h4 className='mt-4 font-semibold text-gray-800'>Duração episóde:</h4>
                                <p>{seriesData.episode_run_time[0]} min</p>
                            </>
                        )}

                        {seriesData?.status && (
                            <>
                                <h4 className='mt-4 font-semibold text-gray-800'>Status:</h4>
                                <p>{seriesData.status}</p>
                            </>
                        )}
                    </div>

                    <div className="p-6 backdrop-blur-xl bg-white/70 rounded-lg shadow flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-gray-900">Redes</h3>
                        <ul className="text-base text-gray-700 flex items-center gap-2 flex-wrap">
                            {seriesData?.networks?.map((item: any) => (
                                <li key={item.id}>
                                    <span className="font-medium">{item.name}</span>
                                </li>
                            ))}
                            {seriesData?.production_companies?.map((item: any) => (
                                <li key={item.id}>
                                    <span className="font-medium">{item.name}</span>
                                </li>
                            ))}
                        </ul>

                        {seriesData?.created_by && seriesData.created_by.length > 0 && (
                            <>
                                <h4 className='mt-4 font-semibold text-gray-800'>Criado por:</h4>
                                <p>{seriesData.created_by.map((c: any) => c.name).join(', ')}</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-2">Sinopse</h3>
                    <p>{seriesData?.overview}</p>
                </div>
            </div>

            <div className='w-full'>
                <h2 className="text-4xl font-bold mb-6">Você também pode gostar</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {similar?.results.slice(0, 10).map((show: any) => (
                        <MovieCard key={show.id} movie={show} />
                    ))}
                </div>
            </div>

        </div>
    )
}

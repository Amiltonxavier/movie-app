import { useParams } from 'react-router-dom'
import { useGetMovie, useGetVideo } from '../../queries/useGetMovie';
import { Player } from '../../components/player';


export default function Movie() {
    const { id } = useParams<{ id: string }>()
    const { data } = useGetMovie(Number(id));
    const { data: video } = useGetVideo(Number(id));
    return (
        <div className='pb-16 flex flex-col items-center justify-center h-full gap-12 px-16'>
            <div className='w-full h-[800px] rounded-2xl overflow-hidden'>
                <Player video={video} />
            </div>

            <div className="p-6 md:p-8 backdrop-blur-xl bg-white/70 rounded-lg shadow flex flex-col gap-4">
                {/* Título do Filme */}
                <h3 className="text-2xl font-bold text-gray-900">{data?.original_title}</h3>

                {/* Informações principais */}
                <div className="text-base text-gray-700 space-x-2">
                    <span>{data?.release_date}</span>
                    <span>•</span>
                    <span>{data?.adult ? "18+" : "Livre"}</span>
                    <span>•</span>
                    <span>{data?.runtime} min</span>
                </div>

                {/* Descrição e elenco */}
                <div className="flex flex-col md:flex-row gap-4 mt-2  text-gray-700">
                    <p className="flex-1 leading-normal">{data?.overview}</p>
                    <div className="hidden md:block w-px bg-gray-200" />
                    <div className="md:w-1/3">
                        <h5 className="font-semibold text-gray-800 mb-1">Elenco:</h5>
                        <p>Michael Rainey Jr., Josh Charles, Brian White</p>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col gap-4'>
                <h2 className="text-4xl font-bold">Trailers</h2>
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {video?.map((item) => (
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

            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6'>{data?.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Gêneros */}
                    <div className="p-6 backdrop-blur-xl bg-white/70 rounded-lg shadow flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-gray-900">Gêneros</h3>
                        <ul className='flex items-center gap-2 flex-wrap'>
                            {data?.genres.map((genre: any) => (
                                <li key={genre.id} className='text-gray-700 font-semibold'>{genre.name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Informações principais / Áudio */}
                    <div className="p-6 backdrop-blur-xl bg-white/70 rounded-lg shadow flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-gray-900">Informações</h3>

                        <h4 className='mt-4 font-semibold text-gray-800'>Idiomas:</h4>
                        <div className='flex flex-wrap gap-2'>
                            {data?.spoken_languages.map((lang: any) => (
                                <span key={lang.iso_639_1} className='bg-gray-100 text-gray-800 px-2 py-1 rounded'>
                                    {lang.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Elenco */}
                    <div className="p-6 backdrop-blur-xl bg-white/70 rounded-lg shadow flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-gray-900">Producao</h3>
                        <ul className="text-base text-gray-700 flex items-center gap-2 flex-wrap">
                            {data?.production_companies.map((item) => (
                                <li key={item.id}>
                                    <span className="font-medium">{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sinopse */}
                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-2">Sinopse</h3>
                    <p className=" ">{data?.overview}</p>
                </div>
            </div>

            <div>
                <h2 className="text-4xl font-bold">Você também pode gostar</h2>
            </div>

        </div>
    )
}

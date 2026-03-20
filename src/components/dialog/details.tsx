import { Dialog } from './dialog';
import { MovieDetailsSkeleton } from './details-skelen';
import { CONSTANTS } from '../../constants';
import { compactNumberFormat, formatDate, getRating, humamizeRuntime } from '../../helpers/helpers';
import { useGetMovie, useGetVideo } from '../../queries/useGetMovie';
import { Player } from '../player';

interface Props {
    onClose: VoidFunction,
    movieId: number,
}

export function DetailsDialog({ onClose, movieId }: Props) {
    const { data, isLoading } = useGetMovie(movieId);
    const { data: video } = useGetVideo(movieId);

    return (
        <Dialog onClose={onClose}>
            {isLoading || !data ? <MovieDetailsSkeleton /> : (
                <div className='text-light-200 flex flex-col gap-8 overflow-auto'>
                    <div className='flex flex-col space-y-5 md:space-y-0 md:flex-row items-start md:items-center justify-between'>
                        <div>
                            <h4 className='font-bold text-white text-2xl md:text-4xl'>{data?.original_title}</h4>
                            <h5>{data?.release_date} <span>•</span>
                                {getRating(data?.adult)} <span>•</span> {humamizeRuntime(data?.runtime!)}
                            </h5>
                        </div>
                        <div className='flex gap-4 flex-col md:flex-row md:items-center'>
                            <div className='px-4 py-[3.5px] rounded-[6px] bg-deep-indigo flex items-center gap-1'>
                                <img src='/star.svg' alt='estrela' />
                                <span className='font-bold text-white'>{data?.vote_average} <span className='font-normal text-light-200'>/10{' '}(200)</span></span>
                            </div>
                            <div className='px-4 py-[3.5px] rounded-[6px] bg-deep-indigo flex items-center gap-1'>
                                <img src='/trending.svg' alt='tendência' />
                                <span className='font-normal text-light-200'>{data?.popularity}</span>
                            </div>
                        </div>
                    </div>

                    <section className="grid md:grid-cols-9 gap-7 w-full">
                        <div className="hidden col-span-3 md:flex justify-center">
                            <div className="max-h-[441px] max-w-[302px] w-full h-full overflow-hidden rounded-[10px]">
                                <img
                                    className="w-full h-full object-cover"
                                    src={data?.poster_path
                                        ? `${CONSTANTS.ASSETS.img.tmdb}/${data?.poster_path}`
                                        : '/no-movie.png'}
                                    alt={data?.title}
                                />
                            </div>
                        </div>

                        <div className="col-span-6 w-full h-[441px] flex items-center justify-center bg-black rounded-[10px] overflow-hidden">
                            <Player video={video} />
                        </div>
                    </section>

                    <section className='flex flex-col gap gap-5'>
                        <div className='flex items-center flex-col-reverse md:flex-row gap-4'>
                            <dl className='flex-1 grid md:grid-cols-5 gap-1.5'>
                                <dt className='col-span-1'>Géneros</dt>
                                <dd className='md:col-span-3 md:flex-row  flex items-center'>
                                    <ul className='flex items-center gap-2 flex-wrap flex-1'>
                                        {data?.genres.map((genre) => (
                                            <li key={genre.id} className='px-4 py-[3.5px] rounded-[6px] bg-deep-indigo'>
                                                <span className='font-bold text-white'>{genre.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </dl>

                            <div className='ml-auto w-full md:w-56'>
                                <a
                                    className='font-semibold font-dm-sans w-full rounded-sm bg-gradient-to-r text-black from-light-300 to-[#AB8BFF] py-4 flex justify-center items-center px-5'
                                    href={data?.homepage}
                                    target='_blank'
                                    rel='noreferrer'
                                    aria-disabled={data?.homepage ? false : true}
                                >
                                    Visitar Página Oficial <img src="/arrow-right.svg" alt='seta-direita' />
                                </a>
                            </div>
                        </div>

                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Resumo</dt>
                            <dd className='col-span-3 text-white text-base'>
                                {data?.overview}
                            </dd>
                        </dl>

                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Data de Lançamento</dt>
                            <dd className='col-span-3 font-semibold text-light-300'>
                                {formatDate(data?.release_date)}
                            </dd>
                        </dl>

                        <dl className="grid md:grid-cols-5 gap-1.5 text-light-300">
                            <dt className="col-span-1 font-medium">Países</dt>
                            <dd className="col-span-4 font-semibold">
                                <div className="flex flex-wrap items-center gap-2">
                                    {data?.origin_country.map((country, index) => (
                                        <span key={index} className="flex items-center">
                                            {index > 0 && <span className="mx-1">•</span>}
                                            {country}
                                        </span>
                                    ))}
                                </div>
                            </dd>
                        </dl>

                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Estado</dt>
                            <dd className='col-span-4 font-semibold text-light-300'>{data?.status}</dd>
                        </dl>

                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Idioma</dt>
                            <dd className='col-span-4 font-semibold text-light-300'>
                                <div className="flex flex-wrap items-center gap-2">
                                    {data?.spoken_languages.map((languages, index) => (
                                        <div key={languages.iso_639_1} className='flex flex-wrap items-center gap-2'>
                                            {index > 0 && <span className='mx-1'>•</span>}
                                            <span>{languages.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </dd>
                        </dl>

                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Orçamento</dt>
                            <dd className='col-span-4 font-semibold text-light-300'>{compactNumberFormat(data?.budget)}</dd>
                        </dl>

                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Receita</dt>
                            <dd className='col-span-4 font-semibold text-light-300'>{compactNumberFormat(data?.revenue)}</dd>
                        </dl>

                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Frase Promocional</dt>
                            <dd className='col-span-4 font-semibold text-light-300'>{data?.tagline}</dd>
                        </dl>

                        <dl className="grid md:grid-cols-5 gap-1.5 text-light-300">
                            <dt className="col-span-1 font-medium">Produtoras</dt>
                            <dd className="col-span-4 font-semibold">
                                <div className="flex flex-wrap items-center gap-2">
                                    {data?.production_companies.map((company, index) => (
                                        <span key={company.id} className="flex items-center">
                                            {index > 0 && <span className="mx-1">•</span>}
                                            {company.name}
                                        </span>
                                    ))}
                                </div>
                            </dd>
                        </dl>
                    </section>
                </div>
            )}
        </Dialog>
    );
}

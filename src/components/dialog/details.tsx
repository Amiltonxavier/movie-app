import { useEffect, useState } from 'react';
import { Dialog } from './dialog';
import { MovieServices } from '../../services/moveis.service';
import { Video } from '../../types/video.types';
import { IMovieDetails } from '../../types/details-movie';
import { MovieDetailsSkeleton } from './details-skelen';
import { CONSTANTS } from '../../constants';
import { toast } from 'sonner';
import { compactNumberFormat, formatDate, getRating, humamizeRuntime } from '../../helpers/helpers';

interface Props {
    onClose: VoidFunction,
    movieId: number,
    movieServices: MovieServices
}

export function DetailsDialog({ onClose, movieId, movieServices }: Props) {
    const [video, setVideo] = useState<Video[]>([]);
    const [moviesADetails, setMoviesDetails] = useState<IMovieDetails | null>(null);
    const [isLoadingMovie, setIsLoadingMovie] = useState(false);


    async function getMovieVideo() {
        try {
            const data = await movieServices.getVideo(movieId);
            if (data) {
                setVideo(data);
            } else {
                toast.warning("Nenhum vídeo encontrado para este filme.");
            }
        } catch (error) {
            console.error("Erro ao buscar vídeo:", error);
        }
        finally {
            // setIsLoadingMovie(false);
        }

    }

    async function getMovieDetails() {
        setIsLoadingMovie(true);
        try {
            const data = await movieServices.getMovieDetails(movieId);
            if (data) {
                setMoviesDetails(data);
            } else {
                toast.warning("Nenhum detalhe encontrado para este filme.");
            }
        } catch (error) {
            toast.error("Erro ao buscar detalhes do filme:");
        }
        finally {
            setIsLoadingMovie(false);
        }
    }


    useEffect(() => {
        getMovieVideo();
        getMovieDetails();
    }, []);



    return (
        <Dialog onClose={onClose}>
            {isLoadingMovie || !moviesADetails ? <MovieDetailsSkeleton /> : (
                <div className='text-light-200 flex flex-col gap-8 overflow-auto'>
                    <div className='flex flex-col space-y-5 md:space-y-0 md:flex-row items-start md:items-center justify-between'>
                        <div>
                            <h4 className='font-bold text-white text-2xl md:text-4xl'>{moviesADetails?.original_title}</h4>
                            <h5>{moviesADetails?.release_date}  <span>•</span>
                                {getRating(moviesADetails?.adult)} <span>•</span> {humamizeRuntime(moviesADetails?.runtime!)}
                            </h5>
                        </div>
                        <div className='flex gap-4 flex-col md:flex-row md:items-center'>
                            <div className='px-4 py-[3.5px] rounded-[6px] bg-deep-indigo flex items-center gap-1'>
                                <img src='/star.svg' alt='star' />
                                <span className='font-bold text-white'>{moviesADetails?.vote_average} <span className='font-normal text-light-200'>/10{' '}(200)</span></span>
                            </div>
                            <div className='px-4 py-[3.5px] rounded-[6px] bg-deep-indigo flex items-center gap-1'>
                                <img src='/trending.svg' alt='star' />
                                <span className='font-normal text-light-200'>{moviesADetails?.popularity}</span>
                            </div>

                        </div>
                    </div>
                    <section className="grid md:grid-cols-9 gap-7 w-full">
                        {/* Imagem do filme */}
                        <div className="hidden col-span-3 md:flex justify-center">
                            <div className="max-h-[441px] max-w-[302px] w-full h-full overflow-hidden rounded-[10px]">
                                <img
                                    className="w-full h-full object-cover"
                                    src={moviesADetails?.poster_path ?
                                        `${CONSTANTS.ASSETS.img.tmdb}/${moviesADetails?.poster_path}`
                                        : '/no-movie.png'}
                                    alt={moviesADetails?.title}
                                />
                            </div>
                        </div>

                        {/* Vídeo do trailer */}
                        <div className="col-span-6 w-full h-[441px] flex items-center justify-center bg-black rounded-[10px] overflow-hidden">

                            <iframe
                                className="w-full h-full"
                                src={`${CONSTANTS.ASSETS.video.youtube}/${video?.find((item => item?.type?.includes('Trailer')))?.key}`}
                                title="YouTube video player"
                                allowFullScreen
                            ></iframe>


                        </div>
                    </section>

                    <section className='flex flex-col gap gap-5'>
                        <div className='flex items-center flex-col-reverse md:flex-row gap-4'>
                            <dl className='flex-1 grid md:grid-cols-5 gap-1.5'>
                                <dt className='col-span-1'>Generes</dt>
                                <dd className='md:col-span-3 md:flex-row  flex items-center'>
                                    <ul className='flex  items-center gap-2 flex-wrap flex-1'>
                                        {
                                            moviesADetails?.genres.map((genre) => (
                                                <li key={genre.id} className='px-4 py-[3.5px] rounded-[6px] bg-deep-indigo'>
                                                    <span className='font-bold text-white'>{genre.name}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </dd>
                            </dl>

                            <div className='ml-auto w-full md:w-44'>
                                <a
                                    className='font-semibold font-dm-sans w-full rounded-sm bg-gradient-to-r text-black from-light-300 to-[#AB8BFF] py-4  flex justify-center items-center px-5'
                                    href={moviesADetails?.homepage}
                                    target='_blank'
                                    rel='noreferrer'
                                    aria-disabled={moviesADetails?.homepage ? false : true}
                                >
                                    Visit Home <img src="/arrow-right.svg" alt='arrow-right' />
                                </a>
                            </div>
                        </div>
                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Overview</dt>
                            <dd className='col-span-3 text-white text-base'>
                                {moviesADetails?.overview}
                            </dd>
                        </dl>
                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Release date</dt>
                            <dd className='col-span-3 font-semibold text-light-300'>
                                {formatDate(moviesADetails?.release_date)}
                            </dd>
                        </dl>
                        <dl className="grid md:grid-cols-5 gap-1.5 text-light-300">
                            <dt className="col-span-1 font-medium">Countries</dt>
                            <dd className="col-span-4 font-semibold">
                                <div className="flex flex-wrap items-center gap-2">
                                    {moviesADetails?.origin_country.map((country, index) => (
                                        <span key={index} className="flex items-center">
                                            {index > 0 && <span className="mx-1">•</span>}
                                            {country}
                                        </span>
                                    ))}
                                </div>
                            </dd>
                        </dl>
                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Status</dt>
                            <dd className='col-span-4 font-semibold text-light-300'>{moviesADetails?.status}</dd>
                        </dl>
                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Language</dt>
                            <dd className='col-span-4 font-semibold text-light-300'>
                                <div className="flex flex-wrap items-center gap-2">
                                    {
                                        moviesADetails?.spoken_languages.map((languages, index) => (
                                            <div key={languages.iso_639_1} className='flex flex-wrap items-center gap-2'>
                                                {index > 0 && <span className='mx-1'>•</span>}
                                                <span>{languages.name}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </dd>
                        </dl>
                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Budget</dt>
                            <dd className='col-span-4 font-semibold text-light-300'>{compactNumberFormat(moviesADetails?.budget)}</dd>
                        </dl>
                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Revenue</dt>
                            <dd className='col-span-4 font-semibold text-light-300'>{compactNumberFormat(moviesADetails?.revenue)}</dd>
                        </dl>
                        <dl className='grid md:grid-cols-5 gap-1.5'>
                            <dt className='col-span-1'>Tagline</dt>
                            <dd className='col-span-4 font-semibold text-light-300'>{moviesADetails?.tagline}</dd>
                        </dl>
                        <dl className="grid md:grid-cols-5 gap-1.5 text-light-300">
                            <dt className="col-span-1 font-medium">Production Companies</dt>
                            <dd className="col-span-4 font-semibold">
                                <div className="flex flex-wrap items-center gap-2">
                                    {moviesADetails?.production_companies.map((company, index) => (
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
    )
}

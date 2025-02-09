import { Movie } from '../../types/movies.types';
import { Dialog } from './dialog';

interface Props {
    onClose: VoidFunction,
    movie: Movie
}

export function DetailsDialog({ onClose, movie }: Props) {
    return (
        <Dialog>
            <div className='text-[#A8B5DB]'>
                <div>
                    <div>
                        <h4>{movie.title}</h4>
                        <h5>2024  <span>•</span> PG-13 <span>•</span>2h 46m</h5>
                    </div>
                    <div>
                        <img src="/star.svg" alt="start icon" />
                    </div>
                </div>

                <section className='grid grid-cols-9 gap-7'>
                    <div className='col-end-2'></div>
                    <div className='col-end-7'> <video className='w-full h-full' /></div>
                </section>
                <section className='flex flex-col gap gap-5'>
                    <dl className='grid grid-cols-5 gap-'>
                        <dt className='col-span-1'>Generes</dt>
                        <dd className='col-span-3'>
                            <ul className='flex items-center gap-2'>
                                <li className='px-4 py-[3.5px] rounded-[6px] bg-[#221F3D]'>
                                    <span className='font-bold text-white'>Adventure</span>
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <dl className='grid grid-cols-5 gap-'>
                        <dt className='col-span-1'>Overview</dt>
                        <dd  className='col-span-3 text-white text-base'>
                        {movie.overview}
                        </dd>
                         <dd  className='ml-auto'>
                            <button>Visit Home</button>
                        </dd>
                    </dl>
                    <dl className='grid grid-cols-5 gap-'>
                        <dt className='col-span-1'>Release date</dt>
                        <dd  className='col-span-3'>Black hot drink</dd>
                    </dl>
                    <dl className='grid grid-cols-5 gap-'>
                        <dt className='col-span-1'>Countries</dt>
                        <dd  className='col-span-3'>Black hot drink</dd>
                    </dl>
                    <dl className='grid grid-cols-5 gap-'>
                        <dt className='col-span-1'>Status</dt>
                        <dd  className='col-span-3'>Black hot drink</dd>
                    </dl>
                    <dl className='grid grid-cols-5 gap-'>
                        <dt className='col-span-1'>Countries</dt>
                        <dd  className='col-span-3'>Black hot drink</dd>
                    </dl>
                    <dl className='grid grid-cols-5 gap-'>
                        <dt className='col-span-1'>Language</dt>
                        <dd  className='col-span-3'>Black hot drink</dd>
                    </dl>
                    <dl className='grid grid-cols-5 gap-'>
                        <dt className='col-span-1'>Budget</dt>
                        <dd  className='col-span-3'>Black hot drink</dd>
                    </dl>
                    <dl className='grid grid-cols-5 gap-'>
                        <dt className='col-span-1'>Revenue</dt>
                        <dd  className='col-span-3'>Black hot drink</dd>
                    </dl>
                    <dl className='grid grid-cols-5 gap-'>
                        <dt className='col-span-1'>Tagline</dt>
                        <dd  className='col-span-3'>Black hot drink</dd>
                    </dl>
                    <dl className='grid grid-cols-5 gap-'>
                        <dt className='col-span-1'>Production Companies</dt>
                        <dd  className='col-span-3'>Black hot drink</dd>
                    </dl>
                </section>
            </div>
        </Dialog>
    )
}

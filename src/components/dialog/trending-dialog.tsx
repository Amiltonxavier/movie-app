import { useGetMovie } from '../../queries/useGetMovie';
import { Dialog } from './dialog';


interface Props {
    onClose: VoidFunction,
    movieId: number,
}

export function TrendingDialog({ onClose, movieId }: Props) {
    const { data } = useGetMovie(movieId);
    return (
        <Dialog onClose={onClose}>
            <div className='text-light-200 flex flex-col gap-8 overflow-auto'>
                <div className="overflow-hidden rounded-lg mb-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-purple-900/20">
                    <img
                        src={data?.poster_path ?
                            `https://image.tmdb.org/t/p/w500/${data?.poster_path}` : '/no-movie.png'}
                        alt={data?.title}
                        width={300}
                        height={400}
                        className="object-cover w-full aspect-[2/3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 opacity-100 transition-opacity flex items-center justify-center">

                        <p>When a gunman enters an Apple Store in the heart of Amsterdam, the police face a delicate challenge to resolve the standoff. Inspired by true events.</p>
                    </div>
                </div>

            </div>
        </Dialog>
    );
}

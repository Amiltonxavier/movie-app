import { Play, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../constants'
import { ITVShow } from '../../types/series.types'

interface Props {
    movie: ITVShow
}

export function TVShowCard({ movie }: Props) {
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate(`${CONSTANTS.ROUTERS.watchTvShow.replace(':id', String(movie.id))}`)}
            type='button'
            className="group text-left hover:cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-lg mb-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-purple-900/20">
                <img
                    src={movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : '/no-movie.png'
                    }
                    alt={movie.name}
                    width={300}
                    height={400}
                    className="object-cover w-full aspect-[2/3]"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <div className="p-2 bg-purple-600 rounded-full">
                        <Play className="w-5 h-5 fill-white text-white" />
                    </div>
                </div>
            </div>
            <h3 className="font-medium truncate">{movie.original_name}</h3>
            <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </span>
                <span>{movie.original_language?.toUpperCase()}</span>
            </div>
        </button>
    )
}

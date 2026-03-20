import { useNavigate } from "react-router-dom";
import { useGetTrendingMovies } from "../queries/useGetMovie"
import { CONSTANTS } from "../constants";

export function Trending() {
    const navigate = useNavigate();
    const { data: trending } = useGetTrendingMovies();

    const handleClick = (movieId: number) => {
        navigate(`${CONSTANTS.ROUTERS.watch.replace(':id', String(movieId))}`);
    };

    return (
        <section className="trending px-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Filmes em alta 🔥</h2>
            {trending && trending.length > 0 ? (
                <ul className="flex gap-4 overflow-x-auto pb-4">
                    {trending.map((movie, index) => (
                        <li 
                            key={movie.$id} 
                            onClick={() => movie.movie_id && handleClick(movie.movie_id)}
                            className="flex-shrink-0 cursor-pointer group"
                        >
                            <div className="relative">
                                <p className="absolute top-2 left-2 text-4xl font-bold text-white/50 group-hover:text-purple-500 transition">
                                    {index + 1}
                                </p>
                                <img 
                                    src={movie.poster_url} 
                                    alt={movie.title} 
                                    className="w-32 h-48 object-cover rounded-lg transition-transform group-hover:scale-105" 
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-500">Nenhum filme encontrado</p>
            )}
        </section>
    )
}
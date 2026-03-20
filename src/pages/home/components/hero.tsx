import { Info, Play, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetTrendingMovies } from "../../../queries/useGetMovie";
import { CONSTANTS } from "../../../constants";

export function Hero() {
    const navigate = useNavigate();
    const { data: trending, isLoading } = useGetTrendingMovies();
    
    const featuredMovie = trending?.[0];

    const handleWatch = () => {
        if (featuredMovie?.movie_id) {
            navigate(`${CONSTANTS.ROUTERS.watch.replace(':id', String(featuredMovie.movie_id))}`);
        }
    };

    if (isLoading) {
        return (
            <section className="relative h-[500px] mb-12">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                <div className="w-full h-full bg-slate-800 animate-pulse" />
            </section>
        )
    }

    return (
        <section className="relative h-[500px] mb-12">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
            <img
                src={featuredMovie?.poster_url || "/hero.png"}
                alt={featuredMovie?.title || "Filme em destaque"}
                className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 z-20 p-8 max-w-2xl">
                <h2 className="text-4xl font-bold mb-2">{featuredMovie?.title || "Filme em destaque"}</h2>
                <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {featuredMovie?.count || "?"}
                    </span>
                </div>
                <div className="flex gap-4">
                    <button 
                        type="button" 
                        onClick={handleWatch}
                        disabled={!featuredMovie?.movie_id}
                        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-full flex items-center gap-2 transition"
                    >
                        <Play className="w-4 h-4 fill-white" /> Assistir
                    </button>
                    <button 
                        type="button" 
                        onClick={handleWatch}
                        disabled={!featuredMovie?.movie_id}
                        className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-full flex items-center gap-2 transition"
                    >
                        <Info className="w-4 h-4" /> Detalhes
                    </button>
                </div>
            </div>
        </section>
    )
}

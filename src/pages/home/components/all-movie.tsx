import { useGetMovies } from '../../../queries/useGetMovie'
import { MovieCard } from '../../../components/movie-card/movie-card';

export function AllMovie() {
    const { data: movies } = useGetMovies()

    return (
        <section className="px-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Todos os filmes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies?.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    )
}

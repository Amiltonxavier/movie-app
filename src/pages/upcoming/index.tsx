import { useSearchParams } from 'react-router-dom'
import { useGetUpcomingMovies } from '../../queries/useGetMovie'
import { MovieCard } from '../../components/movie-card/movie-card'
import { SkeletonGrid } from '../../components/skeleton-grid'
import { Pagination } from '../../components/pagination'

export default function Upcoming() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page') || '1', 10)

    const { data: movies, isLoading } = useGetUpcomingMovies(page)

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage.toString() })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Em Breve</h1>

            {isLoading ? (
                <SkeletonGrid />
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {movies?.results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    <Pagination
                        page={page}
                        totalPages={movies?.total_pages || 1}
                        pageSize={20}
                        onPageChange={handlePageChange}
                        loading={isLoading}
                    />
                </>
            )}
        </div>
    )
}

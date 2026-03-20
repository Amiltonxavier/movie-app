import { useSearchParams } from 'react-router-dom'
import { useGetMoviesByGenre } from '../../queries/useGetMovie'
import { useGetMovieGenres } from '../../queries/useGetGenres'
import { MovieCard } from '../../components/movie-card/movie-card'
import { SkeletonGrid } from '../../components/skeleton-grid'
import { Pagination } from '../../components/pagination'
import { FilterBar } from '../../components/filter-bar'
import { CONSTANTS } from '../../constants'

export default function Movies() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page') || '1', 10)
    const sortBy = searchParams.get('sort') || 'popularity.desc'
    const genreId = searchParams.get('genre') ? parseInt(searchParams.get('genre')!) : null

    const { data: genres } = useGetMovieGenres()
    const { data: movies, isLoading } = useGetMoviesByGenre(genreId, page, sortBy)

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage.toString(), sort: sortBy, ...(genreId && { genre: genreId.toString() }) })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSortChange = (newSort: string) => {
        setSearchParams({ page: '1', sort: newSort, ...(genreId && { genre: genreId.toString() }) })
    }

    const handleGenreChange = (newGenre: number | null) => {
        setSearchParams({ page: '1', sort: sortBy, ...(newGenre && { genre: newGenre.toString() }) })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Filmes</h1>

            <FilterBar
                sortBy={sortBy}
                onSortChange={handleSortChange}
                genres={genres?.genres || []}
                selectedGenre={genreId}
                onGenreChange={handleGenreChange}
                data={CONSTANTS.SORT_OPTIONS_MOVIE}
            />

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
                        onPageSizeChange={() => { }}
                        loading={isLoading}
                    />
                </>
            )}
        </div>
    )
}

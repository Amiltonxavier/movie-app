import { useSearchParams } from 'react-router-dom'
import { useGetSeries } from '../../queries/useGetSeries'
import { useGetTvGenres } from '../../queries/useGetGenres'
import { SkeletonGrid } from '../../components/skeleton-grid'
import { Pagination } from '../../components/pagination'
import { FilterBar } from '../../components/filter-bar'
import { TVShowCard } from '../../components/tv-show-card'
import { CONSTANTS } from '../../constants'

export default function Series() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page') || '1', 10)
    const sortBy = searchParams.get('sort') || 'popular'
    const genreId = searchParams.get('genre') ? parseInt(searchParams.get('genre')!) : undefined

    const { data: genres } = useGetTvGenres()
    const { data: series, isLoading } = useGetSeries(page, sortBy, genreId)

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
            <h1 className="text-3xl font-bold mb-4">Séries</h1>

            <FilterBar
                sortBy={sortBy}
                onSortChange={handleSortChange}
                genres={genres?.genres || []}
                selectedGenre={genreId || null}
                onGenreChange={handleGenreChange}
                data={CONSTANTS.SORT_OPTIONS_TV_SHOW}
            />

            {isLoading ? (
                <SkeletonGrid />
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {series?.results.map((item) => (
                            <TVShowCard key={item.id} movie={item} />
                        ))}
                    </div>

                    <Pagination
                        page={page}
                        totalPages={series?.total_pages || 1}
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

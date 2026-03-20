import { useSearchParams } from 'react-router-dom'
import { useDiscoverMovies } from '../../queries/useGetMovie'
import { useGetMovieGenres } from '../../queries/useGetGenres'
import { MovieCard } from '../../components/movie-card/movie-card'
import { SkeletonGrid } from '../../components/skeleton-grid'
import { Pagination } from '../../components/pagination'
import { FilterBar } from '../../components/filter-bar'
import { CONSTANTS } from '../../constants'
import { useState, useCallback } from 'react'
import type { DiscoverMovieFilters } from '../../types/discover-movie.types'
import { Filter, X } from 'lucide-react'

export default function Movies() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page') || '1', 10)
    const sortBy = (searchParams.get('sort') || 'popularity.desc') as DiscoverMovieFilters['sort_by']
    const genreId = searchParams.get('genre') ? parseInt(searchParams.get('genre')!) : null
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
    const [filters, setFilters] = useState<Partial<DiscoverMovieFilters>>({
        certification_country: 'BR',
        vote_count_gte: 100,
        with_runtime_lte: 240,
    })

    const { data: genres } = useGetMovieGenres()

    const discoverFilters: DiscoverMovieFilters = {
        page,
        sort_by: sortBy,
        with_genres: genreId ? String(genreId) : undefined,
        ...filters,
    }

    const { data: movies, isLoading } = useDiscoverMovies(discoverFilters)

    const handlePageChange = useCallback((newPage: number) => {
        setSearchParams(prev => {
            prev.set('page', newPage.toString())
            return prev
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [setSearchParams])

    const handleSortChange = useCallback((newSort: string) => {
        setSearchParams(prev => {
            prev.set('sort', newSort)
            prev.set('page', '1')
            return prev
        })
    }, [setSearchParams])

    const handleGenreChange = useCallback((newGenre: number | null) => {
        setSearchParams(prev => {
            prev.set('page', '1')
            if (newGenre) {
                prev.set('genre', String(newGenre))
            } else {
                prev.delete('genre')
            }
            return prev
        })
    }, [setSearchParams])

    const handleAdvancedFilterChange = useCallback((key: keyof DiscoverMovieFilters, value: unknown) => {
        setFilters(prev => ({
            ...prev,
            [key]: value || undefined,
        }))
    }, [])

    const clearFilters = useCallback(() => {
        setFilters({
            certification_country: 'US',
            vote_count_gte: 100,
            with_runtime_lte: 240,
        })
        setSearchParams(prev => {
            prev.set('page', '1')
            prev.delete('genre')
            return prev
        })
    }, [setSearchParams])

    const hasActiveFilters = genreId || Object.values(filters).some(v => v !== undefined && v !== 'US' && v !== 100 && v !== 240)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Filmes</h1>
                <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                        showAdvancedFilters ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                >
                    <Filter className="w-4 h-4" />
                    Filtros Avançados
                </button>
            </div>

            <FilterBar
                sortBy={sortBy || "popularity.desc"}
                onSortChange={handleSortChange}
                genres={genres?.genres || []}
                selectedGenre={genreId}
                onGenreChange={handleGenreChange}
                data={CONSTANTS.SORT_OPTIONS_MOVIE}
            />

            {showAdvancedFilters && (
                <div className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Filtros Avançados</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 text-sm text-rose-400 hover:text-rose-300"
                            >
                                <X className="w-4 h-4" />
                                Limpar filtros
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Ano de lançamento</label>
                            <input
                                type="number"
                                placeholder="Ex: 2024"
                                value={filters.year || ''}
                                onChange={(e) => handleAdvancedFilterChange('year', parseInt(e.target.value) || undefined)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">País de certificação</label>
                            <select
                                value={filters.certification_country || 'US'}
                                onChange={(e) => handleAdvancedFilterChange('certification_country', e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="US">Estados Unidos</option>
                                <option value="BR">Brasil</option>
                                <option value="GB">Reino Unido</option>
                                <option value="FR">França</option>
                                <option value="DE">Alemanha</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Certificação mínima</label>
                            <select
                                value={filters.certification_gte || ''}
                                onChange={(e) => handleAdvancedFilterChange('certification_gte', e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Todas</option>
                                <option value="G">G</option>
                                <option value="PG">PG</option>
                                <option value="PG-13">PG-13</option>
                                <option value="R">R</option>
                                <option value="NC-17">NC-17</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Idioma original</label>
                            <select
                                value={filters.with_original_language || ''}
                                onChange={(e) => handleAdvancedFilterChange('with_original_language', e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Todos</option>
                                <option value="en">Inglês</option>
                                <option value="pt">Português</option>
                                <option value="es">Espanhol</option>
                                <option value="fr">Francês</option>
                                <option value="de">Alemão</option>
                                <option value="it">Italiano</option>
                                <option value="ja">Japonês</option>
                                <option value="ko">Coreano</option>
                                <option value="zh">Chinês</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Avaliação mínima</label>
                            <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                placeholder="0-10"
                                value={filters.vote_average_gte || ''}
                                onChange={(e) => handleAdvancedFilterChange('vote_average_gte', parseFloat(e.target.value) || undefined)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Mínimo de votos</label>
                            <input
                                type="number"
                                placeholder="Ex: 100"
                                value={filters.vote_count_gte || ''}
                                onChange={(e) => handleAdvancedFilterChange('vote_count_gte', parseInt(e.target.value) || undefined)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Duração máx. (min)</label>
                            <input
                                type="number"
                                placeholder="Ex: 180"
                                value={filters.with_runtime_lte || ''}
                                onChange={(e) => handleAdvancedFilterChange('with_runtime_lte', parseInt(e.target.value) || undefined)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Duração mín. (min)</label>
                            <input
                                type="number"
                                placeholder="Ex: 60"
                                value={filters.with_runtime_gte || ''}
                                onChange={(e) => handleAdvancedFilterChange('with_runtime_gte', parseInt(e.target.value) || undefined)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                </div>
            )}

            {isLoading ? (
                <SkeletonGrid />
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {movies?.results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    {movies?.results.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            Nenhum filme encontrado com os filtros selecionados.
                        </div>
                    )}

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

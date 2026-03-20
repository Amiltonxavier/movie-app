import { useSearchParams } from 'react-router-dom'
import { useDiscoverSeries } from '../../queries/useGetSeries'
import { useGetTvGenres } from '../../queries/useGetGenres'
import { SkeletonGrid } from '../../components/skeleton-grid'
import { Pagination } from '../../components/pagination'
import { FilterBar } from '../../components/filter-bar'
import { TVShowCard } from '../../components/tv-show-card'
import { CONSTANTS } from '../../constants'
import { useState, useCallback } from 'react'
import type { DiscoverTVFilters } from '../../types/discover-tv.types'
import { Filter, X } from 'lucide-react'

export default function Series() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page') || '1', 10)
    const sortBy = (searchParams.get('sort') || 'popularity.desc') as DiscoverTVFilters['sort_by']
    const genreId = searchParams.get('genre') ? parseInt(searchParams.get('genre')!) : null

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
    const [filters, setFilters] = useState<Partial<DiscoverTVFilters>>({
        vote_count_gte: 100,
        with_runtime_lte: 120,
    })

    const { data: genres } = useGetTvGenres()

    const discoverFilters: DiscoverTVFilters = {
        page,
        sort_by: sortBy,
        with_genres: genreId ? String(genreId) : undefined,
        ...filters,
    }

    const { data: series, isLoading } = useDiscoverSeries(discoverFilters)
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

    const handleAdvancedFilterChange = useCallback((key: keyof DiscoverTVFilters, value: unknown) => {
        setFilters(prev => ({
            ...prev,
            [key]: value || undefined,
        }))
    }, [])

    const clearFilters = useCallback(() => {
        setFilters({
            vote_count_gte: 100,
            with_runtime_lte: 120,
        })
        setSearchParams(prev => {
            prev.set('page', '1')
            prev.delete('genre')
            return prev
        })
    }, [setSearchParams])

    const hasActiveFilters = genreId || Object.values(filters).some(v => v !== undefined && v !== 100 && v !== 120)

    return (
        <div className="px-8 py-8">
            <div className="border-t border-slate-800 my-12" />

            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">Séries</h1>
                <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm ${showAdvancedFilters ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                >
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filtros</span>
                </button>
            </div>

            <FilterBar
                sortBy={sortBy || "popularity.desc"}
                onSortChange={handleSortChange}
                genres={genres?.genres || []}
                selectedGenre={genreId}
                onGenreChange={handleGenreChange}
                data={CONSTANTS.SORT_OPTIONS_TV_SHOW}
            />

            {showAdvancedFilters && (
                <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Filtros Avançados</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 text-sm text-rose-400 hover:text-rose-300"
                            >
                                <X className="w-4 h-4" />
                                Limpar
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Ano de estreia</label>
                            <input
                                type="number"
                                placeholder="Ex: 2024"
                                value={filters.first_air_date_year || ''}
                                onChange={(e) => handleAdvancedFilterChange('first_air_date_year', parseInt(e.target.value) || undefined)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Data de estreia (de)</label>
                            <input
                                type="date"
                                value={filters.first_air_date_gte || ''}
                                onChange={(e) => handleAdvancedFilterChange('first_air_date_gte', e.target.value || undefined)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Data de estreia (até)</label>
                            <input
                                type="date"
                                value={filters.first_air_date_lte || ''}
                                onChange={(e) => handleAdvancedFilterChange('first_air_date_lte', e.target.value || undefined)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
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
                                placeholder="Ex: 60"
                                value={filters.with_runtime_lte || ''}
                                onChange={(e) => handleAdvancedFilterChange('with_runtime_lte', parseInt(e.target.value) || undefined)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Duração mín. (min)</label>
                            <input
                                type="number"
                                placeholder="Ex: 20"
                                value={filters.with_runtime_gte || ''}
                                onChange={(e) => handleAdvancedFilterChange('with_runtime_gte', parseInt(e.target.value) || undefined)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Status</label>
                            <select
                                value={filters.with_status || ''}
                                onChange={(e) => handleAdvancedFilterChange('with_status', e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Todos</option>
                                {CONSTANTS.TV_STATUS_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Tipo</label>
                            <select
                                value={filters.with_type || ''}
                                onChange={(e) => handleAdvancedFilterChange('with_type', e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Todos</option>
                                {CONSTANTS.TV_TYPE_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">País de origem</label>
                            <select
                                value={filters.with_origin_country || ''}
                                onChange={(e) => handleAdvancedFilterChange('with_origin_country', e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Todos</option>
                                <option value="US">Estados Unidos</option>
                                <option value="BR">Brasil</option>
                                <option value="GB">Reino Unido</option>
                                <option value="JP">Japão</option>
                                <option value="KR">Coreia do Sul</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Rede/Emissora</label>
                            <input
                                type="number"
                                placeholder="ID da rede"
                                value={filters.with_networks || ''}
                                onChange={(e) => handleAdvancedFilterChange('with_networks', parseInt(e.target.value) || undefined)}
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
                        {series?.results.map((item: any) => (
                            <TVShowCard key={item.id} movie={item} />
                        ))}
                    </div>

                    {series?.results.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            Nenhuma série encontrada com os filtros selecionados.
                        </div>
                    )}

                    <Pagination
                        page={page}
                        totalPages={series?.total_pages || 1}
                        pageSize={20}
                        onPageChange={handlePageChange}
                        loading={isLoading}
                    />
                </>
            )}
        </div>
    )
}

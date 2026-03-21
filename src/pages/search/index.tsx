import { Search } from "lucide-react"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { useSearchMulti } from "../../queries/useGetMovie"
import { MovieCard } from "../../components/movie-card/movie-card"
import { TVShowCard } from "../../components/tv-show-card"
import { SkeletonGrid } from "../../components/skeleton-grid"
import { Pagination } from "../../components/pagination"
import type { MultiSearchItem } from "../../types/index.d"

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("q") || ""
    const page = parseInt(searchParams.get("page") || "1", 10)
    const [searchQuery, setSearchQuery] = React.useState(query)

    const { data, isLoading } = useSearchMulti(query, page)

    React.useEffect(() => {
        setSearchQuery(query)
    }, [query])

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setSearchParams({ q: searchQuery, page: "1" })
    }

    const handlePageChange = (newPage: number) => {
        setSearchParams({ q: query, page: newPage.toString() })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const results = data?.results ?? []
    const movies = results.filter((item: MultiSearchItem) => item.media_type === 'movie')
    const tvShows = results.filter((item: MultiSearchItem) => item.media_type === 'tv')
    const totalResults = data?.total_results ?? 0

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col space-y-4">
                    <h1 className="text-3xl font-bold">Pesquisa</h1>
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Pesquisar filmes e séries..."
                                className="pl-10 py-2 px-4 rounded-lg border border-slate-700 bg-slate-800 w-full focus:outline-none focus:border-purple-500 transition"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                        >
                            Buscar
                        </button>
                    </form>
                </div>

                {query && (
                    <p className="text-slate-400">
                        {totalResults} resultados para "{query}"
                    </p>
                )}

                {isLoading ? (
                    <SkeletonGrid />
                ) : totalResults > 0 ? (
                    <>
                        {movies.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold mb-4">Filmes ({movies.length})</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {movies.map((item: MultiSearchItem) => (
                                        <MovieCard 
                                            key={item.id} 
                                            movie={{
                                                id: item.id,
                                                poster_path: item.poster_path ?? undefined,
                                                title: item.title || item.original_title || '',
                                                original_title: item.original_title || '',
                                                overview: item.overview || '',
                                                release_date: item.release_date || '',
                                                vote_average: item.vote_average,
                                                original_language: item.original_language || '',
                                            }} 
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {tvShows.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold mb-4">Séries ({tvShows.length})</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {tvShows.map((item: MultiSearchItem) => (
                                        <TVShowCard 
                                            key={item.id} 
                                            movie={{
                                                adult: item.adult || false,
                                                backdrop_path: item.backdrop_path ?? null,
                                                genre_ids: item.genre_ids || [],
                                                id: item.id,
                                                origin_country: [],
                                                original_language: item.original_language || '',
                                                original_name: item.original_name || '',
                                                overview: item.overview || '',
                                                popularity: item.popularity || 0,
                                                poster_path: item.poster_path ?? null,
                                                first_air_date: item.first_air_date || '',
                                                name: item.name || item.original_name || '',
                                                vote_average: item.vote_average,
                                                vote_count: item.vote_count,
                                            }} 
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        <Pagination
                            page={page}
                            totalPages={data?.total_pages || 1}
                            pageSize={20}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : query ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Search className="h-16 w-16 text-slate-600 mb-4" />
                        <h3 className="text-xl font-medium">Nenhum resultado encontrado</h3>
                        <p className="text-slate-500 mt-2">Tente usar termos diferentes.</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Search className="h-16 w-16 text-slate-600 mb-4" />
                        <h3 className="text-xl font-medium">Busque seus filmes e séries favoritos</h3>
                        <p className="text-slate-500 mt-2">Digite um termo para começar.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

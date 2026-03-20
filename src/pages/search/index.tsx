import { Search } from "lucide-react"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { useGetMovies } from "../../queries/useGetMovie"
import { MovieCard } from "../../components/movie-card/movie-card"
import { SkeletonGrid } from "../../components/skeleton-grid"
import { Pagination } from "../../components/pagination"

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("q") || ""
    const page = parseInt(searchParams.get("page") || "1", 10)
    const [searchQuery, setSearchQuery] = React.useState(query)

    const { data, isLoading } = useGetMovies(query, page)

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
                                placeholder="Pesquisar filmes..."
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
                        {results.length} resultados para "{query}"
                    </p>
                )}

                {isLoading ? (
                    <SkeletonGrid />
                ) : results.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {results.map((item) => (
                                <MovieCard key={item.id} movie={item} />
                            ))}
                        </div>
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
                        <h3 className="text-xl font-medium">Busque seus filmes favoritos</h3>
                        <p className="text-slate-500 mt-2">Digite um termo para começar.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

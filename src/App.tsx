import { useEffect, useState } from "react"
import { Search } from "./components/search"
import { MovieCard } from "./components/movie-card/movie-card"
import { useDebounce } from "react-use"
import { MovieCardSkeleton } from "./components/movie-card/skeleton"
import { useGetMovies } from "./queries/useGetMovie"
import { Trending } from "./components/trending"
import { Nav } from "./components/nav"

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const { data: movies, isLoading, error, refetch } = useGetMovies(debouncedSearchTerm)

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 600, [searchTerm])

  useEffect(() => {
    refetch()
  }, [debouncedSearchTerm, refetch])

  return (
    <main>
      <Nav />
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>
            Encontre <span className="text-gradient">Filmes</span> que você vai adorar sem complicações
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <Trending />
        <section className="all-movies">
          <h2>Todos os filmes</h2>

          {isLoading ? (
            <ul>
              <MovieCardSkeleton />
            </ul>
          ) : error ? (
            <p className="text-rose-500">Error loading movies</p>
          ) : (
            <ul>
              {movies?.results
                .filter((movie) => !movie.adult)
                .map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                  />
                ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App

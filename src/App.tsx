import { useEffect, useState } from "react"
import { Search } from "./components/search"
import { MoveServices } from "./services/moveis.service";
import { DiscoverMoviesResponse, Movie } from "./types/movies.types";
import { MovieCard } from "./components/movie-card";
import { useDebounce } from "react-use";
import { getTrendingMovie, updateSearchCount } from "./lib/appwrite";
import { DetailsDialog } from "./components/dialog/details";


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [moviesList, setMoviesList] = useState<DiscoverMoviesResponse>();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState<[]>([]);
  const [isMovieDetailsDialogOpen, setIsMovieDetailsDialog] = useState(false);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null)

  //Debounce the Search term to prevent making too many API request
  //by waiting for the to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 600, [searchTerm])

  function onOpenMovieDetailsDaialog(){
    setIsMovieDetailsDialog(true)
  }

  function onSelectMovie (movie: Movie){
    setSelectMovie(movie)
    onOpenMovieDetailsDaialog();
  }


  function onCloseMovieDetailsDaialog(){
    setIsMovieDetailsDialog(false);
    setSelectMovie(null)
  }

  const moveServices = new MoveServices();

  async function getPopulrityMovies() {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await moveServices.list(searchTerm);
      setMoviesList(data);

      if(searchTerm && data.results.length > 0) {
        await updateSearchCount(searchTerm, data.results[0])
      }
    } catch (error) {
      console.error(error); // Verifique se há erros
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function getTrendingMovies(){
      try{
          const response = await getTrendingMovie();
            if(!response) return 

          setTrendingMovies(response)
      }catch(error){
       console.log(error)
      }
  }

  useEffect(() => {
    getPopulrityMovies();

  }, [debouncedSearchTerm]);

  useEffect(() => {
    getTrendingMovies()
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You’ll Love Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {
          trendingMovies.length > 0 && (
            <section className="trending">
                <h2>Treding Movie</h2>

                <ul>
                  {
                    trendingMovies.map((movie, index) =>(
                      <li key={movie.$id}>
                          <p>{index+1}</p>
                          <img src={movie.poster_url} alt={movie.title} />
                      </li>
                    ))
                  }
                </ul>
            </section>
          )
        }

        <section className="all-movies">
          <h2 >All Movies</h2>
          {
            isLoading ? (
              <p className="text-white">Loading...</p>
            ) : errorMessage ? (
              <p className="text-rose-500">{errorMessage}</p>
            ) : (
              <ul>
                {moviesList?.results.filter((movie) => !movie.adult).map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onOpenDetailsDialog={() => onSelectMovie(movie)} />
                ))}
              </ul>
            )
          }

        </section>
      </div>
      {
          isMovieDetailsDialogOpen && selectMovie && <DetailsDialog movie={selectMovie} onClose={onCloseMovieDetailsDaialog} />
      }
    </main>
  )
}

export default App

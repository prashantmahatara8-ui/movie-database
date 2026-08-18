import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/moviecard";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const searchMovies = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US&query=${encodeURIComponent(query)}&page=1`
        );

        const data = await response.json();

        setMovies(data.results);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  return (
    <div className="search-page">
      <h1>
        Search Results {query && `for "${query}"`}
      </h1>

      {loading && <p>Searching...</p>}

      {!loading && query && movies.length === 0 && (
        <p>No movies found.</p>
      )}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;
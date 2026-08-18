import { useEffect, useState } from "react";
import MovieCard from "../components/moviecard";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        setMovies(data.results);
      } catch (error) {
        console.error(error);
        setError("Unable to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="home-page">
      <div className="hero">
        <div>
          <p className="small-title">WELCOME TO MOVIEDB</p>

          <h1>
            Discover Your Next
            <span> Favorite Movie</span>
          </h1>

          <p className="hero-text">
            Explore popular movies, search for your favorites,
            and discover detailed information about every movie.
          </p>
        </div>
      </div>

      <div className="section-title">
        <h2>Popular Movies</h2>
        <p>Trending movies right now</p>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading movies...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
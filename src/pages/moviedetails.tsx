import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
}

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US`
        );

        const data = await response.json();

        setMovie(data);
      } catch (error) {
        console.error("Error loading movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p>Loading movie...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div className="movie-details">
      <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      {movie.backdrop_path && (
        <img
          className="movie-backdrop"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />
      )}

      <div className="movie-details-content">
        <img
          className="movie-poster"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Poster"
          }
          alt={movie.title}
        />

        <div>
          <h1>{movie.title}</h1>

          <p>
            <strong>Release:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Rating:</strong> ⭐{" "}
            {movie.vote_average.toFixed(1)}
          </p>

          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>

          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>

          <h2>Overview</h2>

          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
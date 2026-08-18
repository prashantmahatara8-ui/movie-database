import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  const title = movie.title || movie.name || "Unknown Movie";
  const releaseDate = movie.release_date || movie.first_air_date || "";

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="poster-container">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Poster"
          }
          alt={title}
        />

        <div className="rating">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="movie-info">
        <h3>{title}</h3>

        <p>
          {releaseDate ? releaseDate.substring(0, 4) : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
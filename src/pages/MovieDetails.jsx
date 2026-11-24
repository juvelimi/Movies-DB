import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieVideos } from "../services/api";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTrailerKey(null);
    getMovieDetails(id)
      .then((data) => {
        setMovie(data);
      })
      .catch(() => {
        setError("Could not load movie details.");
      })
      .finally(() => {
        setLoading(false);
      });
    getMovieVideos(id)
      .then((videos) => {
        const trailer = videos.find(
          (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
        );
        if (trailer?.key) setTrailerKey(trailer.key);
      })
      .catch(() => {});
  }, [id]);

  if (error || !movie) {
    return (
      <div className="movie-details-message">
        <p>{error || "Movie not found."}</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  const year = movie.release_date?.split("-")[0];
  const genres = movie.genres ?? [];

  return (
    <div className="movie-details">
      {backdropUrl && (
        <div
          className="movie-details-backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
          aria-hidden
        />
      )}
      <div className="movie-details-content">
        <Link to="/" className="movie-details-back">
          ← Back to Home
        </Link>
        <div className="movie-details-main">
          {posterUrl && (
            <img
              src={posterUrl}
              alt={movie.title}
              className="movie-details-poster"
            />
          )}
          <div className="movie-details-info">
            <h1 className="movie-details-title">{movie.title}</h1>
            <div className="movie-details-meta">
              {year && <span className="movie-details-meta-item">{year}</span>}
              {movie.runtime != null && (
                <span className="movie-details-meta-item">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
              {movie.vote_average != null && (
                <span className="movie-details-meta-item movie-details-rating">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
              )}
            </div>
            {genres.length > 0 && (
              <div className="movie-details-genres">
                {genres.map((g) => (
                  <span key={g.id} className="movie-details-genre-tag">
                    {g.name}
                  </span>
                ))}
              </div>
            )}
            {movie.overview && (
              <div className="movie-details-overview-block">
                <h2 className="movie-details-overview-title">Overview</h2>
                <p className="movie-details-overview">{movie.overview}</p>
              </div>
            )}
            {trailerKey && (
              <div className="movie-details-trailer-block">
                <h2 className="movie-details-trailer-title">Trailer</h2>
                <div className="movie-details-trailer-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}?rel=0`}
                    title={`${movie.title} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="movie-details-trailer-iframe"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

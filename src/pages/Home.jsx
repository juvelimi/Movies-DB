import MovieCard from "../components/movieCard";
import { useState } from "react";
import "./Home.css";
import { getPopularMovies, searchMovies } from "../services/api";
import { useEffect } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setMoviesError(null);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies ?? []);
      } catch (error) {
        console.error("Error loading popular movies:", error);
        setMoviesError("Movies couldn't be loaded. Please try again later.");
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchResults = await searchMovies(searchQuery);
    setMovies(searchResults);
    setMoviesError(null);
    if (searchResults.length === 0) {
      setMoviesError("No movies found. Please try again.");
    }
  };
  const isSearching = searchQuery.trim().length > 0;
  const sectionLabel = isSearching ? "Search results" : "Popular now";

  const posterBase = "https://image.tmdb.org/t/p/w185";
  const heroPosters = movies.filter((m) => m.poster_path).slice(0, 24);

  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="hero-bg" aria-hidden>
          <div className="hero-bg-posters">
            {heroPosters.map((movie, i) => (
              <div
                key={`hero-poster-${movie.id}-${i}`}
                className="hero-bg-poster"
                style={{
                  backgroundImage: `url(${posterBase}${movie.poster_path})`,
                }}
              />
            ))}
          </div>
          <div className="hero-bg-overlay" aria-hidden />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Cine<span>vo</span>
          </h1>
          <p className="hero-tagline">Discover movies. Save favorites.</p>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search movies"
            />
            <button type="submit" className="search-btn">
              <span className="search-btn-text">Search</span>
              <span className="search-btn-icon" aria-hidden>
                →
              </span>
            </button>
          </form>
        </div>
      </div>
      <section className="movies-section">
        <div className="section-header">
          <span className="section-accent" />
          <h2 className="section-title">{sectionLabel}</h2>
        </div>
        {moviesError && (
          <div className="movies-error" role="alert">
            {moviesError}
          </div>
        )}
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      <footer className="home-footer">
        <div className="home-footer-inner">
          <p className="home-footer-brand">
            Cine<span>vo</span>
          </p>
          <p className="home-footer-tagline">Discover movies. Save favorites.</p>
          <div className="home-footer-links">
            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
              Powered by TMDB
            </a>
          </div>
          <p className="home-footer-copy">© {new Date().getFullYear()} Cinevo. For demo use.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;

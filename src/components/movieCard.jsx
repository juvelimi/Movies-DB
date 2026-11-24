import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import { selectIsFavorite } from "../store/favoritesSlice";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(movie?.id));
  const title = movie?.title;
  const release_date = movie?.release_date;
  const poster = movie?.poster_path;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(movie));
  };

  return (
    <Link to={`/movie/${movie?.id}`} className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt={title} />
      <div className="fav-button">
        <button
          type="button"
          onClick={handleFavoriteClick}
          className={isFavorite ? "fav-button--active" : ""}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          ♥
        </button>
      </div>
      <div className="movie-info">
        <h2>{title}</h2>
        <p>{release_date?.split("-")[0]}</p>
      </div>
    </Link>
  );
}

export default MovieCard;

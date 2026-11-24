import { useSelector, useDispatch } from "react-redux";
import { selectFavorites, clearAllFavorites } from "../store/favoritesSlice";
import MovieCard from "../components/movieCard";
import "./Favorites.css";

function Favorites() {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <>
          <p>No favorites yet</p>
          <p className="favorites-page-hint">
            Start adding your favorite movies by clicking the heart on any movie!
          </p>
        </>
      ) : (
        <>
          <button
            type="button"
            className="favorites-clear-all"
            onClick={() => dispatch(clearAllFavorites())}
          >
            Clear All
          </button>
          <div className="favorites-grid">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { getPopularMovies } from "../services/api";
import "./Login.css";

const POSTER_BASE = "https://image.tmdb.org/t/p/w185";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [posterMovies, setPosterMovies] = useState([]);

  useEffect(() => {
    getPopularMovies().then((results) => {
      setPosterMovies((results ?? []).filter((m) => m.poster_path).slice(0, 24));
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.name.value.trim();
    dispatch(login(username || "User"));
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-bg" aria-hidden>
        <div className="login-bg-posters">
          {posterMovies.map((movie, i) => (
            <div
              key={`login-poster-${movie.id}-${i}`}
              className="login-bg-poster"
              style={{ backgroundImage: `url(${POSTER_BASE}${movie.poster_path})` }}
            />
          ))}
        </div>
        <div className="login-bg-overlay" aria-hidden />
      </div>
      <div className="login-card">
        <h1>Sign In</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Email or username"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            minLength={8}
          />
          <input type="submit" value="Sign In" />
        </form>
      </div>
    </div>
  );
}

export default Login;

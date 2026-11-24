import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite(state, action) {
      const movie = action.payload;
      const index = state.findIndex((m) => m.id === movie.id);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(movie);
      }
    },
    clearAllFavorites() {
      return [];
    },
  },
});

export const { toggleFavorite, clearAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const selectFavorites = (state) => state.favorites;
export const selectIsFavorite = (movieId) => (state) =>
  state.favorites.some((m) => m.id === movieId);

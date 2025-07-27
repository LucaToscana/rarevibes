// src/store/visitedArtistsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const MAX_VISITED = 10;

const visitedArtistsSlice = createSlice({
  name: 'visitedArtists',
  initialState: {
    visited: [],
  },
  reducers: {
    addVisitedArtist: (state, action) => {
      const artist = action.payload;
      if (!artist?.id) return;

      // Rimuove duplicati
      state.visited = state.visited.filter((a) => a.id !== artist.id);

      // Inserisce in cima
      state.visited.unshift({
        id: artist.id,
        name: artist.name,
        slug: artist.slug,
        image: artist.images?.[0],
      });

      // Limita a MAX_VISITED
      if (state.visited.length > MAX_VISITED) {
        state.visited = state.visited.slice(0, MAX_VISITED);
      }
    },
    clearVisitedArtists: (state) => {
      state.visited = [];
    },
  },
});

export const { addVisitedArtist, clearVisitedArtists } = visitedArtistsSlice.actions;
export default visitedArtistsSlice.reducer;

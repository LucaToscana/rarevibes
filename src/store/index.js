import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import artistsReducer from './artistsSlice';
import filtersReducer from './filtersSlice';
import visitedArtistsReducer from './visitedArtistsSlice'; 
export const store = configureStore({
  reducer: {
    player: playerReducer,
    artists: artistsReducer,
    filters: filtersReducer,
    visitedArtists: visitedArtistsReducer,
  },
});

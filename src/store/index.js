// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import artistsReducer from './artistsSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    artists: artistsReducer,  // <--- aggiungi qui!
  },
});
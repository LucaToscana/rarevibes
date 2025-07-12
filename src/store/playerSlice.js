// store/playerSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  artist: null,
  platform: null, // "spotify" | "soundcloud" | "youtube"
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setArtist: (state, action) => {
      state.artist = action.payload
      // Resetta la piattaforma se è cambiato artista
      state.platform = null
    },
    setPlatform: (state, action) => {
      state.platform = action.payload
    },
  },
})

export const { setArtist, setPlatform } = playerSlice.actions
export default playerSlice.reducer

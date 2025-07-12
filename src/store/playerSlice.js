import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  artist: null,
  platform: null,
  zoomOpen: false,
  zoomImg: null,
  playerOpen: false, // flag per aprire/chiudere il player
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setArtist: (state, action) => {
      state.artist = action.payload

      state.platform = null
    },
    setPlatform: (state, action) => {
      state.platform = action.payload
      state.playerOpen = !!action.payload && !!state.artist
    },
    setPlayerOpen: (state, action) => {
      state.playerOpen = action.payload
    },
    setZoomOpen: (state, action) => {
      state.zoomOpen = action.payload.open
      state.zoomImg = action.payload.img || null
    },
    closeZoom: (state) => {
      state.zoomOpen = false
      state.zoomImg = null
    },
  },
})

export const { setArtist, setPlatform, setPlayerOpen, setZoomOpen, closeZoom } = playerSlice.actions
export default playerSlice.reducer

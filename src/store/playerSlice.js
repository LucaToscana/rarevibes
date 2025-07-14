import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  artist: null,
  platform: "youtube",
  zoomOpen: false,
  zoomImg: null,
  playerOpen: false, // flag per aprire/chiudere il player
  autoPlay: false
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setArtist: (state, action) => {
      state.artist = action.payload
      state.autoPlay = false
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
    setAutoPlay: (state, action) => {
      state.autoPlay = action.payload
    }
  },
})

export const { setArtist, setPlatform, setPlayerOpen, setZoomOpen, closeZoom, setAutoPlay } = playerSlice.actions
export default playerSlice.reducer

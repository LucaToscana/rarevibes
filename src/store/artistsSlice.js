// store/artistsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchArtists = createAsyncThunk(
  'artists/fetchArtists',
  async () => {
    const res = await fetch('/data/artists.json')
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    return data
  }
)

const artistsSlice = createSlice({
  name: 'artists',
  initialState: {
    artistsData: [],
    loading: false,
    error: null,
    selectedArtist: null,
  },
  reducers: {
    setSelectedArtist(state, action) {
      state.selectedArtist = action.payload
    },
    clearSelectedArtist(state) {
      state.selectedArtist = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.loading = false
        state.artistsData = action.payload
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { setSelectedArtist, clearSelectedArtist } = artistsSlice.actions
export default artistsSlice.reducer

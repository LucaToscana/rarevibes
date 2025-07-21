import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    mainFilter: ["all"],
    subFilter: [],
    mainGenres: [
      "rock",
      "metal",
      "pop",
      "hiphop",
      "electronic",
      "jazz",
      "classical",
      "folk",
      "reggae",
      "all",
      "painting",
      "drawing",
      "printmaking",
      "sculpture",
      "photography",
      "digital-art",
      "illustration",
      "installation",
      "performance-art",
      "conceptual",
    ],
  },
  reducers: {
    setMainFilter(state, action) {
      const newFilter = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      // Compare the stringified versions of the arrays
      if (JSON.stringify(state.mainFilter) === JSON.stringify(newFilter)) {
        state.mainFilter = ["all"]; // If contents are identical, toggle to 'all'
      } else {
        state.mainFilter = newFilter; // Otherwise, set the new filter
      }
    },
    setSubFilter(state, action) {
      state.subFilter =
        state.subFilter === action.payload ? [] : action.payload;
    },
  },
});

export const { setMainFilter, setSubFilter } = filtersSlice.actions;
export default filtersSlice.reducer;

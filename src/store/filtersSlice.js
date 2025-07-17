import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        mainFilter: ['all'],
        subFilter: [],
        mainGenres: [
            'rock', 'metal', 'pop', 'hiphop', 'electronic',
            'jazz', 'classical', 'folk', 'reggae','all'
        ]
    },
    reducers: {
        setMainFilter(state, action) {
            state.mainFilter = state.mainFilter === action.payload ? ['all'] : action.payload
        },
        setSubFilter(state, action) {
            state.subFilter = state.subFilter === action.payload ? [] : action.payload
        },
    },
})

export const { setMainFilter, setSubFilter } = filtersSlice.actions
export default filtersSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        mainFilter: 'all',
        subFilter: 'all',
    },
    reducers: {
        setMainFilter(state, action) {
            state.mainFilter = state.mainFilter === action.payload ? 'all' : action.payload
            state.subFilter = 'all' // reset subFilter when mainFilter changes
        },
        setSubFilter(state, action) {
            state.subFilter = state.subFilter === action.payload ? 'all' : action.payload
        },
    },
})

export const { setMainFilter,setSubFilter } = filtersSlice.actions
export default filtersSlice.reducer

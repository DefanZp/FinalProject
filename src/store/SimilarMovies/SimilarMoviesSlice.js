import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: true,
    error: null,
}

const SimilarMoviesSlice = createSlice({
    name: "similarMovies",
    initialState,
    reducers: {
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },

        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {fetchSuccess, fetchError} = SimilarMoviesSlice.actions;

export default SimilarMoviesSlice.reducer
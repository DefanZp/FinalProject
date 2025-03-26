import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: true,
    movieId: null,
    error: false,
};

const CollectionMoviesSlice = createSlice({
    name: "collectionMovies",
    initialState,
    reducers: {
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchIdSuccess: (state, action) => {
            state.loading = false;
            state.movieId = action.payload;
          },
        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchSuccess, fetchError, fetchIdSuccess } = CollectionMoviesSlice.actions;

export default CollectionMoviesSlice.reducer;
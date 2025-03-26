import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movieCast: {},
    movieLoading: true,
    movieError: null, 
}

const CastMovie = createSlice ({
    name: "castMovie",
    initialState,
    reducers: {
        fetchMovieSuccess: (state, action) => {
            state.movieLoading = false;
            state.movieCast = action.payload;
        },
        fetchMovieError: (state, action) => {
            state.movieLoading = false;
            state.movieError = action.payload;
        }
    }
})

export const {fetchMovieSuccess, fetchMovieError} = CastMovie.actions;

export default CastMovie.reducer
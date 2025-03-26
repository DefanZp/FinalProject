import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: true,
    movieId: [],
    error: null,
};

const ForYouSlice = createSlice ({
    name: "forYou",
    initialState,
    reducers: {

        fetchSuccess: (state, action) => {
            state.loading = false;
            state.data = [...state.data, ...action.payload];
        },

        fetchIdSuccess: (state, action) => {
            state.loading = false;
            state.movieId = action.payload;
        },

        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
});

export const {fetchSuccess, fetchError, fetchIdSuccess} = ForYouSlice.actions;

export default ForYouSlice.reducer;
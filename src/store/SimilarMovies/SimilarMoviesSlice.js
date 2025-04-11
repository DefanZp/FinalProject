import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false, 
    error: null,
    collectionId: null
};

const SimilarMoviesSlice = createSlice({
    name: "similarMovies",
    initialState,
    reducers: {
        
        fetchStart: (state) => {
            state.loading = true;
            state.error = null;
            state.data = []; 
        },

        fetchCollectionId: (state, action) => {
            state.collectionId = action.payload;
        },
      
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload; 
            state.error = null;
        },
        
        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.data = []; 
        }
    }
});


export const { fetchStart, fetchSuccess, fetchError, fetchCollectionId } = SimilarMoviesSlice.actions;

export default SimilarMoviesSlice.reducer;
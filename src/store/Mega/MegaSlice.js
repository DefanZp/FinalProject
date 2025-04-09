
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  movies: [],
  loading: true, 
  error: null,   
};

const MegaSlice = createSlice({
  name: "mega",
  initialState,
  reducers: {
 
    fetchMegaStart: (state) => {
      state.loading = true;
      state.movies = []; 
      state.error = null; 
    },
  
    fetchMegaSuccess: (state, action) => {
      state.loading = false;
      state.movies = action.payload;
      state.error = null; 
    },
  
    fetchMegaError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.movies = [];
    },

  },
});


export const { fetchMegaStart, fetchMegaSuccess, fetchMegaError } = MegaSlice.actions;

export default MegaSlice.reducer;
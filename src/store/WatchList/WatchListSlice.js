import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  watchlist: [], 
  watchlistStatus: {}, 
  loading: false, 
  error: null, 
};


const WatchListSlice = createSlice({
  name: "watchlist", 
  initialState, 
  reducers: {
    // Action untuk memulai proses fetching
    startFetching: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Action untuk menyimpan daftar film favorit
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.watchlist = action.payload; 

      // Update status favorit untuk setiap film
      const statusMap = {};
      action.payload.forEach((movie) => {
        statusMap[movie.id] = true; // Set status favorit untuk setiap film
      });
      state.watchlistStatus = statusMap;
    },

    // Action untuk menangani kesalahan
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    },

    // Action untuk menambahkan film ke favorit
    addWatchlist: (state, action) => {
      const { movieId } = action.payload;
      state.watchlistStatus[movieId] = true; // Set status favorit untuk film tertentu
    },

    // Action untuk menghapus film dari favorit
    removeWatchlist: (state, action) => {
      const { movieId } = action.payload;
      state.watchlistStatus[movieId] = false; 
    },
  },
});


export const {
  startFetching,
  fetchSuccess,
  fetchError,
  addWatchlist,
  removeWatchlist,
} = WatchListSlice.actions;


export default WatchListSlice.reducer;
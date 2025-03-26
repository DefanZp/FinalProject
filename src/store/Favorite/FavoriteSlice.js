import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  favorite: [], 
  favoriteStatus: {}, 
  loading: false,
  error: null, 
};


const FavoriteSlice = createSlice({
  name: "favorite", 
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
      state.favorite = action.payload; 

      // Update status favorit untuk setiap film
      const statusMap = {};
      action.payload.forEach((movie) => {
        statusMap[movie.id] = true; // Set status favorit untuk setiap film
      });
      state.favoriteStatus = statusMap;
    },

    // Action untuk menangani kesalahan
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    },


    // Action untuk menambahkan film ke favorit
    addFavorite: (state, action) => {
      const { movieId } = action.payload;
      state.favoriteStatus[movieId] = true; // Set status favorit untuk film tertentu
    },

    // Action untuk menghapus film dari favorit
    removeFavorite: (state, action) => {
      const { movieId } = action.payload;
      state.favoriteStatus[movieId] = false; 
    },
  },
});


export const {
  startFetching,
  fetchSuccess,
  fetchError,
  addFavorite,
  removeFavorite,
} = FavoriteSlice.actions;


export default FavoriteSlice.reducer;
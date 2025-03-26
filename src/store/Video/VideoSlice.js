import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [], 
  loading: true, 
  error: false, 
  movieId: null,
};

const VideoSlice = createSlice({
  name: "video", 
  initialState,
  reducers: {
    
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const { fetchSuccess, fetchError } = VideoSlice.actions;

export default VideoSlice.reducer;
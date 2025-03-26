import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: true,
  error: false,
};

const NowPlayingSlice = createSlice({
  name: "nowPlaying",
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

export const { fetchSuccess, fetchError } = NowPlayingSlice.actions;
export default NowPlayingSlice.reducer;
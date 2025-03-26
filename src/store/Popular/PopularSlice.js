import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: true,
  error: false,
};

const PopularSlice = createSlice({
  name: "popular",
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

export const { fetchSuccess, fetchError } = PopularSlice.actions;
export default PopularSlice.reducer;
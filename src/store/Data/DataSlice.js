import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: true,
  error: false,
};

const dataSlice = createSlice({
  name: "data",
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

export const {
    actions : dataActions,
    reducer : dataReducer
} = dataSlice

export default dataSlice;
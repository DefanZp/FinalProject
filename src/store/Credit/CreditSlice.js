import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  data: [], 
  loading: true, 
  error: false, 
};


const CreditSlice = createSlice({
  name: "credit", 
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


export const { fetchSuccess, fetchError } = CreditSlice.actions;

export default CreditSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cast: [],
    loading: true,
    error: null,
}

const CastDetail = createSlice({

    name: "castDetail",
    initialState,
    reducers: {

        fetchSuccess: (state, action) => {
            state.loading = false;
            state.cast = action.payload;
        },

        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { fetchSuccess, fetchError} = CastDetail.actions;

export default CastDetail.reducer
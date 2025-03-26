import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rating: 0,
}

const ratingSlice = createSlice({
    name: "rating",
    initialState,
    reducers: {
        setRating: (state, action) => {
            state.rating = action.payload;
        },
        resetRating: (state) => {
            state.rating = 0;
        }
    }
})

export const { setRating, resetRating} = ratingSlice.actions;
export default ratingSlice.reducer;
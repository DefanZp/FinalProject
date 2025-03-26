
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false, 
};

const MenuSlice = createSlice({
  name: "menu", 
  initialState,
  reducers: {
   
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen; 
    },
   
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = MenuSlice.actions;

export default MenuSlice.reducer;
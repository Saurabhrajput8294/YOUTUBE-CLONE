import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpenFlag: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpenFlag = !state.isMenuOpenFlag;
    },
    closeMenu: (state) => {
      state.isMenuOpenFlag = false;
    },
  },
});

export default appSlice.reducer;
export const { toggleMenu, closeMenu } = appSlice.actions;

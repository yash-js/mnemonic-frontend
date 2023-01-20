import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activepopup: '',
    closepopup: '',
};

export const popoverSlice = createSlice({
  name: "popover",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setActivePopOver: (state, action) => {
      state.activepopoverlist = action.payload;
    },
    setHidePopOver: (state, action) => {
      state.hidepopoverlist = action.payload;
    }
  },
});

export const {
    setActivePopOver,
    setHidePopOver
} = popoverSlice.actions;
export const getActivePopOver = (state) => state.popover.activepopoverlist;
export const getHidePopOver = (state) => state.popover.hidepopoverlist;

export default popoverSlice.reducer;
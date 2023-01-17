import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activepopup: '',
};

export const popoverSlice = createSlice({
  name: "popover",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setActivePopOver: (state, action) => {
      state.activepopoverlist = action.payload;
    },
  },
});

export const {
    setActivePopOver,
} = popoverSlice.actions;
export const getActivePopOver = (state) => state.popover.activepopoverlist;

export default popoverSlice.reducer;
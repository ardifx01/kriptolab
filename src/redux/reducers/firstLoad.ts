import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface firstLoadState {
  firstLoad: boolean;
}

const initialState: firstLoadState = {
  firstLoad: true,
};

export const firstLoadSlice = createSlice({
  name: "firstLoad",
  initialState,
  reducers: {
    setFirstLoad: (state, action: PayloadAction<boolean>) => {
      state.firstLoad = action.payload;
    },
  },
});

export const { setFirstLoad } = firstLoadSlice.actions;
const firstLoadReducer = firstLoadSlice.reducer;

export default firstLoadReducer;

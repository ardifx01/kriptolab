import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAssetBalance } from "@/types";

interface portfolioState {
  idrBalance: number;
  assets: IAssetBalance[];
}

const initialState: portfolioState = {
  idrBalance: 0,
  assets: [],
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setIDRBalance: (state, action: PayloadAction<number>) => {
      state.idrBalance = action.payload;
    },
    setAssets: (state, action: PayloadAction<IAssetBalance[]>) => {
      state.assets = action.payload;
    },
  },
});

export const { setIDRBalance, setAssets } = portfolioSlice.actions;
const portfolioReducer = portfolioSlice.reducer;

export default portfolioReducer;

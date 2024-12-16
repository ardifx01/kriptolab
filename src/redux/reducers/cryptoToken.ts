import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITokenPair, ITokenPrice } from "@/types";

interface CryptoTokenState {
  tokenPairsData: ITokenPair[];
  tokenPricesData: ITokenPrice[];
  searchToken: string;
}

const initialState: CryptoTokenState = {
  tokenPairsData: [],
  tokenPricesData: [],
  searchToken: "",
};

export const cryptoTokenSlice = createSlice({
  name: "cryptoToken",
  initialState,
  reducers: {
    setTokenPairsData: (state, action: PayloadAction<ITokenPair[]>) => {
      state.tokenPairsData = action.payload;
    },
    setTokenPricesData: (state, action: PayloadAction<ITokenPrice[]>) => {
      state.tokenPricesData = action.payload;
    },
    setSearchToken: (state, action: PayloadAction<string>) => {
      state.searchToken = action.payload;
    },
  },
});

export const { setTokenPairsData, setTokenPricesData, setSearchToken } =
  cryptoTokenSlice.actions;
const cryptoTokenReducer = cryptoTokenSlice.reducer;

export default cryptoTokenReducer;

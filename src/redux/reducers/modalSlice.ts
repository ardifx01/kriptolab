import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  depositModal: boolean;
  withdrawModal: boolean;
}

const initialState: modalState = {
  depositModal: false,
  withdrawModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setDepositModal: (state, action: PayloadAction<boolean>) => {
      state.depositModal = action.payload;
    },
    setWithdrawModal: (state, action: PayloadAction<boolean>) => {
      state.withdrawModal = action.payload;
    },
  },
});

export const { setDepositModal, setWithdrawModal } = modalSlice.actions;
const modalReducer = modalSlice.reducer;

export default modalReducer;

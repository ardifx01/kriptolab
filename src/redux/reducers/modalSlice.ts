import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  depositModal: boolean;
  withdrawModal: boolean;
  supportModal: boolean;
}

const initialState: modalState = {
  depositModal: false,
  withdrawModal: false,
  supportModal: false,
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
    setSupportModal: (state, action: PayloadAction<boolean>) => {
      state.supportModal = action.payload;
    },
  },
});

export const { setDepositModal, setWithdrawModal, setSupportModal } =
  modalSlice.actions;
const modalReducer = modalSlice.reducer;

export default modalReducer;

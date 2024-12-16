import { useDispatch, useSelector } from "react-redux";

import { setDepositModal, setWithdrawModal } from "@/redux/reducers/modalSlice";
import { RootState } from "@/redux/store";

const useModal = () => {
  const { depositModal, withdrawModal } = useSelector(
    (state: RootState) => state.modal,
  );
  const dispatch = useDispatch();

  const openDepositModal = () => {
    dispatch(setDepositModal(true));
  };

  const closeDepositModal = () => {
    dispatch(setDepositModal(false));
  };

  const openWithdrawModal = () => {
    dispatch(setWithdrawModal(true));
  };

  const closeWithdrawModal = () => {
    dispatch(setWithdrawModal(false));
  };

  return {
    depositModal,
    withdrawModal,
    openDepositModal,
    closeDepositModal,
    openWithdrawModal,
    closeWithdrawModal,
  };
};

export default useModal;

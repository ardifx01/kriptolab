import { useDispatch, useSelector } from "react-redux";

import { setFirstLoad } from "@/redux/reducers/firstLoad";
import {
  setDepositModal,
  setSupportModal,
  setWithdrawModal,
} from "@/redux/reducers/modalSlice";
import { RootState } from "@/redux/store";

const useModal = () => {
  const { depositModal, withdrawModal, supportModal } = useSelector(
    (state: RootState) => state.modal,
  );
  const { firstLoad } = useSelector((state: RootState) => state.firstLoad);
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

  const closeFirstLoadModal = () => {
    dispatch(setFirstLoad(false));
  };

  const openSupportModal = () => {
    dispatch(setSupportModal(true));
  };

  const closeSupportModal = () => {
    dispatch(setSupportModal(false));
  };

  return {
    depositModal,
    withdrawModal,
    firstLoad,
    supportModal,
    openDepositModal,
    closeDepositModal,
    openWithdrawModal,
    closeWithdrawModal,
    closeFirstLoadModal,
    openSupportModal,
    closeSupportModal,
  };
};

export default useModal;

import { useDispatch, useSelector } from "react-redux";

import { setFirstLoad } from "@/redux/reducers/globalSettingsSlice";
import { setDepositModal, setWithdrawModal } from "@/redux/reducers/modalSlice";
import { RootState } from "@/redux/store";

const useModal = () => {
  const { depositModal, withdrawModal } = useSelector(
    (state: RootState) => state.modal,
  );
  const { firstLoad } = useSelector((state: RootState) => state.globalSettings);
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

  return {
    depositModal,
    withdrawModal,
    firstLoad,
    openDepositModal,
    closeDepositModal,
    openWithdrawModal,
    closeWithdrawModal,
    closeFirstLoadModal,
  };
};

export default useModal;

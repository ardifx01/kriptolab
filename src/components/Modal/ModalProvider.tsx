import React from "react";

import WithdrawalModal from "@/features/dashboard/components/PortfolioBalanceIDR/WithdrawalModal";
import useModal from "@/hooks/useModal";

import DepositModal from "../Deposit/Deposit";

const ModalProvider = () => {
  const { depositModal, withdrawModal, closeDepositModal, closeWithdrawModal } =
    useModal();

  return (
    <>
      <DepositModal open={depositModal} onClose={closeDepositModal} />
      <WithdrawalModal open={withdrawModal} onClose={closeWithdrawModal} />
    </>
  );
};

export default ModalProvider;

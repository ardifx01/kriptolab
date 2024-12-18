import React from "react";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button/Button";
import useModal from "@/hooks/useModal";
import usePortfolio from "@/hooks/usePortfolio";

const PortfolioBalanceIDR = () => {
  const { formattedBalance } = usePortfolio();
  const { openDepositModal, openWithdrawModal } = useModal();
  const { t } = useTranslation();

  return (
    <div className="max-w-xl rounded-lg border-2 border-borderColor bg-cardBackground p-4 md:p-5">
      <h3 className="text-lg md:text-xl">{t("Balance")}</h3>
      <p className="mb-4 mt-2 text-2xl font-semibold md:text-3xl">
        Rp {formattedBalance}
      </p>
      <div className="flex gap-5">
        <Button className="w-[130px]" onClick={openDepositModal}>
          Deposit
        </Button>
        <Button
          variant="secondary"
          className="w-[130px]"
          onClick={openWithdrawModal}
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default PortfolioBalanceIDR;

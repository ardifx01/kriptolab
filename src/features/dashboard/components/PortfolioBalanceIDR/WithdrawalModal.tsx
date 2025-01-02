import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button/Button";
import CustomNumberInput from "@/components/Form/CustomNumberInput";
import Modal from "@/components/Modal/Modal";
import { showToast } from "@/components/Toast/CustomToast";
import useNumberInput from "@/hooks/useNumberInput";
import usePortfolio from "@/hooks/usePortfolio";
import { withdrawService } from "@/lib/services";
import { quickAddPercentage } from "@/types";

interface WithdrawalModalProps {
  open: boolean;
  onClose: () => void;
}

const WithdrawalModal = ({ open, onClose }: WithdrawalModalProps) => {
  const { idrBalance, refreshBalance, formattedBalance } = usePortfolio();
  const { t } = useTranslation();

  const { value, displayValue, handleInputChange, handleInputBlur } =
    useNumberInput(0, idrBalance);

  const [loading, setLoading] = useState(false);

  const handleQuickAdd = (percentage: number) => {
    if (percentage === 100) {
      handleInputChange(idrBalance.toString());
      return;
    }

    const totalIdr = (idrBalance * percentage) / 100;
    handleInputChange(totalIdr.toFixed(2));
  };

  // Withdrawal function
  const handleWithdrawal = async () => {
    try {
      setLoading(true);
      await withdrawService(value);
      showToast.success(`Withdrawal Rp.${value} success!`);
      handleInputChange("0");
      onClose();
    } catch (error) {
      console.log(error);
      showToast.error(`Withdrawal Rp.${value} failed!`);
    } finally {
      setLoading(false);
      await refreshBalance();
    }
  };

  return (
    <Modal
      title={t("Withdrawal")}
      isOpen={open}
      onClose={onClose}
      className="max-w-[600px]"
    >
      <div className="mb-6 mt-4 space-y-4">
        <p className="text-start text-xs text-textSecondary md:text-sm">
          {t("Balance")}: Rp.{formattedBalance}
        </p>
        <CustomNumberInput
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={t("Enter withdrawal amount")}
          className="p-3"
          suffix="IDR"
        />

        <div className="grid grid-cols-4 gap-3 md:flex md:justify-between">
          {quickAddPercentage.map((option) => (
            <Button
              variant="secondary"
              key={option}
              className="h-8 w-full bg-transparent text-xs md:text-sm"
              onClick={() => handleQuickAdd(option)}
            >
              {option}%
            </Button>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            disabled={value <= 0 || value > idrBalance || loading}
            className="h-11 w-full md:mt-2 md:h-12"
            onClick={handleWithdrawal}
          >
            {loading ? t("Processing...") : t("Withdraw")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawalModal;

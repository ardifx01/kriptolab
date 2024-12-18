import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import useNumberInput from "@/hooks/useNumberInput";
import usePortfolio from "@/hooks/usePortfolio";
import { depositService } from "@/lib/services";

import Button from "../Button/Button";
import CustomNumberInput from "../Form/CustomNumberInput";
import Modal from "../Modal/Modal";
import { showToast } from "../Toast/CustomToast";

interface DepositProps {
  open: boolean;
  onClose: () => void;
}

type quickDepositOptions = "100K" | "500K" | "1M" | "5M";

const quickDepositOptions: quickDepositOptions[] = ["100K", "500K", "1M", "5M"];

const MIN_DEPOSIT = 100000; // Minimum deposit of 100,000 IDR
const MAX_DEPOSIT = 1000000000; // Maximum deposit of 1 billion IDR

const DepositModal = ({ onClose, open }: DepositProps) => {
  const { value, displayValue, handleInputChange, handleInputBlur } =
    useNumberInput(0, 1000000000, 2);
  const { refreshBalance } = usePortfolio();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  // Quick deposit options
  const handleQuickDeposit = (option: quickDepositOptions) => {
    switch (option) {
      case "100K":
        handleInputChange((value + 100000).toString());
        break;
      case "500K":
        handleInputChange((value + 500000).toString());
        break;
      case "1M":
        handleInputChange((value + 1000000).toString());
        break;
      case "5M":
        handleInputChange((value + 5000000).toString());
        break;
      default:
        break;
    }
  };

  // Deposit function
  const handleDeposit = async () => {
    try {
      setLoading(true);
      await depositService(value);
      showToast.success(`Deposit Rp.${value} success!`);
      handleInputChange("0");
      onClose();
    } catch (error) {
      console.log(error);
      showToast.error(`Deposit Rp.${value} failed!`);
    } finally {
      setLoading(false);
      await refreshBalance();
    }
  };

  return (
    <Modal
      title="Deposit"
      isOpen={open}
      onClose={onClose}
      className="max-w-[600px]"
    >
      <div className="mb-6 mt-4 space-y-4">
        <p className="-mb-1 text-start text-xs text-textSecondary md:text-sm">
          {t("Deposit Disclaimer")}
        </p>
        <div className="space-y-2">
          <CustomNumberInput
            value={displayValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder={t("Enter deposit amount")}
            className="p-3"
            suffix="IDR"
          />

          <p className="text-start text-xs text-textSecondary md:text-sm">
            Min Rp.{MIN_DEPOSIT.toLocaleString()} - Max Rp.
            {MAX_DEPOSIT.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3 md:flex md:justify-between">
          {quickDepositOptions.map((option) => (
            <Button
              variant="secondary"
              key={option}
              className="h-8 w-full bg-transparent text-xs md:text-sm"
              onClick={() => handleQuickDeposit(option)}
            >
              +{option}
            </Button>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            disabled={
              value <= 0 ||
              value < MIN_DEPOSIT ||
              value > MAX_DEPOSIT ||
              loading
            }
            className="h-11 w-full md:mt-2 md:h-12"
            onClick={handleDeposit}
          >
            {loading ? t("Processing...") : "Deposit"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DepositModal;

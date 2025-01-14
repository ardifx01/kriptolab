import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import CustomNumberInput from "@/components/Form/CustomNumberInput";
import { showToast } from "@/components/Toast/CustomToast";
import useNumberInput from "@/hooks/useNumberInput";
import usePortfolio from "@/hooks/usePortfolio";
import { sellService } from "@/lib/services";
import { ITokenDetails, quickAddPercentage } from "@/types";

import ConfirmationModal from "./ConfirmationModal";

const SellPanel = ({ token }: { token: ITokenDetails }) => {
  const { t } = useTranslation();

  // TOKEN INPUT
  const {
    value: tokenValue,
    displayValue: tokenDisplay,
    handleInputChange: handleTokenChange,
    handleInputBlur: handleTokenBlur,
  } = useNumberInput();
  // IDR INPUT
  const {
    value: idrValue,
    displayValue: idrDisplay,
    handleInputChange: handleIDRChange,
    handleInputBlur: handleIDRBlur,
  } = useNumberInput();
  const { getAssetBalance, refreshBalance } = usePortfolio();

  const tokenSymbol = token.pairDetails.traded_currency_unit;
  const assetBalance = getAssetBalance(tokenSymbol);

  const [loading, setLoading] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  // HANDLE TOKEN INPUT
  const handleTokenInput = (value: string) => {
    handleTokenChange(value);
    if (token.priceDetails) {
      const totalIdr = parseFloat(value) * parseFloat(token.priceDetails.last);
      handleIDRChange(totalIdr.toString());
    }
  };

  // HANDLE IDR INPUT
  const handleIdrInput = (value: string) => {
    handleIDRChange(value);
    if (token.priceDetails) {
      const tokenAmount =
        parseFloat(value) / parseFloat(token.priceDetails.last);
      handleTokenChange(tokenAmount.toFixed(9).toString());
    }
  };

  // QUICK ADD OPTIONS
  const handleQuickAdd = (percentage: number) => {
    if (token.priceDetails) {
      const tokenAmount = (assetBalance * percentage) / 100;
      const totalIdr = tokenAmount * parseFloat(token.priceDetails.last) || 0;

      handleTokenChange(tokenAmount.toString());
      handleIDRChange(totalIdr.toString());
    }
  };

  // HANDLE BUY CRYPTO
  const handleSell = async () => {
    if (token.priceDetails?.last === undefined) return;
    try {
      setLoading(true);

      const tokenprice = parseFloat(token.priceDetails.last);
      const tradingFee = token.pairDetails.trade_fee_percent;

      const response = await sellService({
        amount: tokenValue || 0,
        price: tokenprice || 0,
        symbol: tokenSymbol || "",
        fee: tradingFee,
      });

      if (response) {
        handleTokenChange("");
        handleIDRChange("");
        await refreshBalance();
        showToast.success(`${t("Sell")} ${tokenValue} ${tokenSymbol} success!`);
      }
    } catch (error) {
      console.error(error);
      showToast.error(`${t("Sell")} ${tokenValue} ${tokenSymbol} failed!`);
    } finally {
      setLoading(false);
      setOpenConfirmation(false);
    }
  };

  // BUTTON STATES
  const getSellButtonState = () => {
    // Processing state
    if (loading)
      return {
        text: t("Processing..."),
        disabled: true,
      };

    // No input
    if (tokenValue <= 0 || idrValue <= 0)
      return {
        text: `Enter ${tokenSymbol} Amount`,
        disabled: true,
      };

    // Insufficient balance
    if (tokenValue > assetBalance)
      return {
        text: t("Insufficient Token Balance", { Token: tokenSymbol }),
        disabled: true,
      };

    // Minimum transaction check
    const minimumTransactionAmount = 10000;
    if (idrValue < minimumTransactionAmount)
      return {
        text: `Minimum ${minimumTransactionAmount.toLocaleString()} IDR`,
        disabled: true,
      };

    return {
      text: `${t("SELL")} ${tokenSymbol}`,
      disabled: false,
    };
  };

  const buttonState = getSellButtonState();

  if (!token) return <>Loading..</>;

  return (
    <div className="grid gap-y-4 px-4 py-5">
      <CustomNumberInput
        value={tokenDisplay}
        onChange={(v) => handleTokenInput(v)}
        onBlur={handleTokenBlur}
        placeholder={`${tokenSymbol} Amount`}
        className="p-3"
        suffix={tokenSymbol}
      />
      <div className="mb-1 flex gap-3">
        {quickAddPercentage.map((v) => (
          <button
            key={v}
            onClick={() => handleQuickAdd(v)}
            className={classNames(
              "flex flex-1 items-center justify-center rounded-lg border",
              "border-primaryAccent bg-primaryAccent/20 py-2 text-sm text-gray-50",
              "hover:bg-primaryAccent/30 md:text-base",
            )}
          >
            {v}%
          </button>
        ))}
      </div>

      <CustomNumberInput
        value={idrDisplay}
        onChange={(v) => handleIdrInput(v)}
        onBlur={handleIDRBlur}
        placeholder={"Total IDR"}
        className="p-3"
        suffix="IDR"
      />

      <p className="text-start text-sm text-textSecondary">
        {t("Balance")}: {assetBalance.toLocaleString()} {tokenSymbol}
      </p>

      <Button
        disabled={buttonState.disabled}
        className="w-full lg:h-12"
        onClick={() => setOpenConfirmation(true)}
      >
        {buttonState.text}
      </Button>

      <ConfirmationModal
        isOpen={openConfirmation}
        token={token}
        totalIdr={idrValue}
        totalCrypto={tokenValue}
        loading={loading}
        type="Sell"
        onClose={() => setOpenConfirmation(false)}
        onConfirm={handleSell}
      />
    </div>
  );
};

export default SellPanel;

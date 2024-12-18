import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button/Button";
import CustomNumberInput from "@/components/Form/CustomNumberInput";
import { showToast } from "@/components/Toast/CustomToast";
import useNumberInput from "@/hooks/useNumberInput";
import usePortfolio from "@/hooks/usePortfolio";
import { buyService } from "@/lib/services";
import { ITokenDetails, quickAddPercentage } from "@/types";

const BuyPanel = ({ token }: { token: ITokenDetails }) => {
  const { t } = useTranslation();
  const { idrBalance, refreshBalance } = usePortfolio();

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

  const [loading, setLoading] = useState(false);

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
      const totalIdr = (idrBalance * percentage) / 100;
      const tokenAmount = totalIdr / parseFloat(token.priceDetails.last) || 0;

      handleTokenChange(tokenAmount.toString());
      handleIDRChange(totalIdr.toString());
    }
  };

  // HANDLE BUY CRYPTO
  const handleBuy = async () => {
    if (token.priceDetails?.last === undefined) return;
    try {
      setLoading(true);

      const tokenprice = parseFloat(token.priceDetails.last);
      const tokenSymbol = token.pairDetails.traded_currency_unit;

      const response = await buyService({
        amount: tokenValue || 0,
        price: tokenprice || 0,
        symbol: tokenSymbol || "",
      });

      if (response) {
        handleTokenChange("");
        handleIDRChange("");

        showToast.success(`Buy ${tokenValue} ${tokenSymbol} success!`);
      }
    } catch (error) {
      console.error(error);
      showToast.error(
        `Buy ${tokenValue} ${token.pairDetails.traded_currency_unit} failed!`,
      );
    } finally {
      setLoading(false);
      await refreshBalance();
    }
  };

  // BUTTON STATES
  const getBuyButtonState = () => {
    // Processing state
    if (loading)
      return {
        text: t("Processing..."),
        disabled: true,
      };

    // No input
    if (tokenValue <= 0 || idrValue <= 0)
      return {
        text: `Enter ${token.pairDetails.traded_currency_unit} Amount`,
        disabled: true,
      };

    // Insufficient balance
    if (idrValue > idrBalance)
      return {
        text: t("Insufficient IDR Balance"),
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
      text: `${t("BUY")} ${token.pairDetails.traded_currency_unit}`,
      disabled: false,
    };
  };

  const buttonState = getBuyButtonState();

  if (!token) return <>Loading..</>;

  return (
    <div className="grid w-full gap-y-4 px-4 py-5">
      <CustomNumberInput
        value={tokenDisplay}
        onChange={(v) => handleTokenInput(v)}
        onBlur={handleTokenBlur}
        placeholder={`${token.pairDetails.traded_currency_unit} Amount`}
        className="p-3"
        suffix={token.pairDetails.traded_currency_unit}
      />
      <div className="mb-1 flex gap-3">
        {quickAddPercentage.map((v) => (
          <Button
            key={v}
            onClick={() => handleQuickAdd(v)}
            variant="secondary"
            className="w-full bg-transparent px-0"
          >
            {v}%
          </Button>
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
        {t("Balance")}: Rp.{idrBalance.toLocaleString()}
      </p>

      <Button
        disabled={buttonState.disabled}
        className="lg:h-12"
        onClick={handleBuy}
      >
        {buttonState.text}
      </Button>
    </div>
  );
};

export default BuyPanel;

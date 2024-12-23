import React from "react";

import Image from "next/image";

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { ITokenDetails } from "@/types";

export interface ConfirmationModalProps {
  isOpen: boolean;
  token: ITokenDetails;
  totalIdr: number;
  totalCrypto: number;
  loading: boolean;
  type: "Buy" | "Sell";
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  isOpen,
  token,
  totalCrypto,
  totalIdr,
  loading,
  type,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  const feePercentage = token.pairDetails.trade_fee_percent;
  const feeAmount = (totalIdr * feePercentage) / 100;
  const totalCost =
    type === "Buy" ? totalIdr + feeAmount : totalIdr - feeAmount;

  const formattedCrypto =
    totalCrypto.toFixed(5) + " " + token.pairDetails.traded_currency_unit;
  const formattedTotalIdr = formatCurrencyValue(totalIdr, "IDR", true, "de");
  const formattedFeeAmount = formatCurrencyValue(feeAmount, "IDR", true, "de");
  const formattedTotalCost = formatCurrencyValue(totalCost, "IDR", true, "de");

  return (
    <Modal
      title="Confirm Transaction"
      isOpen={isOpen}
      onClose={!loading ? onClose : () => {}}
      className="max-w-[600px]"
    >
      <div className="mb-6 mt-4 w-full">
        <div className="flex flex-col items-center gap-3">
          <Image
            src={token.pairDetails.url_logo!}
            alt={token.pairDetails.id}
            width={64}
            height={64}
            className="size-16 rounded-full"
          />
          <p className="mb-2 text-xl font-bold">
            {totalCrypto.toFixed(5)} {token.pairDetails.traded_currency_unit}
          </p>
          <section className="w-full space-y-2 rounded-xl bg-background/40 p-4 font-medium">
            <div className="flex justify-between gap-4">
              <span className="text-textSecondary">Total Amount (IDR):</span>
              <span className="text-lg">{formattedTotalIdr}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-textSecondary">
                Total {token.pairDetails.traded_currency_unit}:
              </span>
              <span className="text-lg">{formattedCrypto}</span>
            </div>

            <div className="flex justify-between gap-4 border-b border-borderColor pb-2">
              <span className="text-textSecondary">
                Fee ({feePercentage}%):
              </span>
              <span className="text-lg">{formattedFeeAmount}</span>
            </div>

            <div className="flex justify-between gap-4 pt-1">
              <span className="text-textSecondary">Total After Fee:</span>
              <span className="text-lg">{formattedTotalCost}</span>
            </div>
          </section>
        </div>
        <Button
          disabled={loading}
          className="mt-6 w-full lg:h-12"
          onClick={onConfirm}
        >
          {loading
            ? "Processing..."
            : type === "Buy"
              ? "Confirm Buy"
              : "Confirm Sell"}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import classNames from "classnames";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import CustomTable from "@/components/Table/TableCustom";
import { ColumnType } from "@/components/Table/types";
import useTxHistory from "@/hooks/useTxHistory";
import useWindowSize from "@/hooks/useWindowSize";
import { formatDate } from "@/lib/helpers";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { ITransaction, TransactionType } from "@/types";

const TransactionHistory = () => {
  const { t } = useTranslation();
  const { txBuyHistory, txDepositHistory, txSellHistory, txWithdrawalHistory } =
    useTxHistory();
  const { isMobile } = useWindowSize();

  const [selectedTxType, setSelectedTxType] = useState<TransactionType>(
    TransactionType.BUY,
  );

  const txHistoryData: { title: TransactionType; data: ITransaction[] }[] = [
    { title: TransactionType.BUY, data: txBuyHistory },
    { title: TransactionType.SELL, data: txSellHistory },
    { title: TransactionType.DEPOSIT, data: txDepositHistory },
    { title: TransactionType.WITHDRAWAL, data: txWithdrawalHistory },
  ];

  const currentTxData =
    txHistoryData.find((item) => item.title === selectedTxType)?.data || [];

  const txHistoryColumn: ColumnType<ITransaction>[] = [
    {
      key: "date",
      label: t("Date"),
      width: isMobile ? 200 : "25%",
      className: "border-r border-borderColor px-3",
      customRender(value, rowData) {
        return (
          <span
            className={
              rowData.type === "BUY" || rowData.type === "DEPOSIT"
                ? "text-success"
                : "text-error"
            }
          >
            {formatDate(
              Math.floor(new Date(value).getTime() / 1000).toString() || "",
              "id-ID",
              true,
            )}
          </span>
        );
      },
    },
    {
      key: "type",
      label: t("Type"),
      width: isMobile ? 200 : "25%",
      className: "border-r border-borderColor px-3",
      customRender(value, rowData) {
        return (
          <span
            className={classNames(
              "capitalize",
              rowData.type === "BUY" || rowData.type === "DEPOSIT"
                ? "text-success"
                : "text-error",
            )}
          >
            {t(value.toLowerCase())}{" "}
            {rowData.type === "DEPOSIT" || rowData.type === "WITHDRAWAL"
              ? ""
              : rowData.type === "BUY"
                ? rowData.traded_currency
                : rowData.base_currency}
          </span>
        );
      },
    },
    {
      key: "price",
      label: t("Price"),
      width: isMobile ? 200 : "25%",
      className: "border-r border-borderColor px-3",
      customRender(value, rowData) {
        return (
          <span
            className={
              rowData.type === "BUY" || rowData.type === "DEPOSIT"
                ? "text-success"
                : "text-error"
            }
          >
            {formatCurrencyValue(parseFloat(value || "0"), "IDR", true) ?? 1}
          </span>
        );
      },
    },
    {
      key: "traded_amount",
      label:
        selectedTxType === "DEPOSIT" || selectedTxType === "WITHDRAWAL"
          ? t("Amount")
          : t("Token Amount"),
      width: isMobile ? 200 : "25%",
      className: "px-3 border-r border-transparent",
      customRender(value, rowData) {
        return (
          <span
            className={
              rowData.type === "BUY" || rowData.type === "DEPOSIT"
                ? "text-success"
                : "text-error"
            }
          >
            {rowData.type === "DEPOSIT" || rowData.type === "WITHDRAWAL"
              ? formatCurrencyValue(parseFloat(value || "0"), "IDR", true)
              : value}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="mb-4 w-full text-2xl font-medium sm:text-3xl md:mb-6">
        {t("Transaction History")}
      </h2>
      {!isMobile && (
        <div className="flex gap-4">
          {txHistoryData.map((tx) => (
            <div
              key={tx.title}
              onClick={() => setSelectedTxType(tx.title)}
              className={classNames(
                "flex h-10 min-w-[120px] cursor-pointer items-center justify-center rounded-lg border-2 px-4 capitalize",
                selectedTxType === tx.title
                  ? "border-transparent bg-primaryAccent hover:brightness-110"
                  : "border-borderColor bg-cardBackground hover:brightness-125",
              )}
            >
              {t(tx.title.toLocaleLowerCase())}
            </div>
          ))}
        </div>
      )}

      {isMobile && (
        <Menu>
          <MenuButton
            className={classNames(
              "flex h-10 items-center gap-1.5 rounded-lg border text-sm capitalize",
              "border-borderColor bg-cardBackground px-4 lg:border-2 lg:px-5",
            )}
          >
            {selectedTxType.toLowerCase()}
            <ChevronDownIcon />
          </MenuButton>
          <MenuItems
            anchor="bottom start"
            transition
            className={classNames(
              "mt-2 flex min-w-[150px] flex-col gap-3 rounded-lg p-4",
              "border border-borderColor bg-cardBackground text-sm",
              "origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",
            )}
          >
            {txHistoryData.map((tx) => (
              <MenuItem
                key={tx.title}
                onClick={() => setSelectedTxType(tx.title)}
                as={"div"}
                className={"flex items-center justify-between gap-1 capitalize"}
              >
                {t(tx.title.toLowerCase())}
                {selectedTxType === tx.title && <CheckIcon />}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      )}

      <div className="mt-4 rounded-xl border border-borderColor md:mt-5">
        <CustomTable
          rowKey="_id"
          columns={txHistoryColumn}
          data={currentTxData ?? []}
          rowHeight={46}
          headerHeight={46}
          className="w-full"
          wrapperClassName="border-none !rounded-none max-w-[calc(100vw-2rem)] md:max-w-none"
        />
        {currentTxData.length === 0 && (
          <div className="flex h-[200px] w-full items-center justify-center border-b border-borderColor">
            <span className="mb-4">{t("No Data")}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;

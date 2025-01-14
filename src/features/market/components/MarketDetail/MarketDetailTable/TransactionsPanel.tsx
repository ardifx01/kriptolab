import React from "react";
import { useTranslation } from "react-i18next";

import CustomTable from "@/components/Table/TableCustom";
import { ColumnType } from "@/components/Table/types";
import useWindowSize from "@/hooks/useWindowSize";
import { formatDate } from "@/lib/helpers";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { ITradeHistory } from "@/types";

const TransactionsPanel = ({
  trades,
  symbol,
}: {
  trades: ITradeHistory[];
  symbol: string;
}) => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();

  const THEAD: string[] = ["Date", "Type", "Price", "Amount"];

  const marketColumns: ColumnType<ITradeHistory>[] = [
    {
      key: "date",
      label: t("Date"),
      width: isMobile ? 200 : "25%",
      className: "border-r border-borderColor px-3",
      customRender(value, rowData) {
        return (
          <span
            className={rowData.type === "buy" ? "text-success" : "text-error"}
          >
            {formatDate(value || "", "id-ID", true)}
          </span>
        );
      },
    },
    {
      key: "type",
      label: t("Type"),
      width: isMobile ? 200 : "25%",
      className: "border-r border-borderColor capitalize px-3",
      customRender(value, rowData) {
        return (
          <span
            className={rowData.type === "buy" ? "text-success" : "text-error"}
          >
            {t(value)}
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
            className={rowData.type === "buy" ? "text-success" : "text-error"}
          >
            {formatCurrencyValue(parseFloat(value || "0"), "IDR", true) ?? 1}
          </span>
        );
      },
    },
    {
      key: "amount",
      label: t("Amount"),
      width: isMobile ? 200 : "25%",
      className: "px-3 border-r border-transparent",
      customRender(value, rowData) {
        return (
          <span
            className={rowData.type === "buy" ? "text-success" : "text-error"}
          >
            {value} {symbol}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      {!isMobile && (
        <div className="sticky top-0 z-10 flex h-11 w-full items-center border-b border-borderColor bg-background">
          {THEAD.map((item, index) => (
            <div
              key={index}
              className="mb-[1px] flex h-full w-1/4 items-center border-r border-borderColor px-3 text-textSecondary last:border-transparent"
            >
              {t(item)}
            </div>
          ))}
        </div>
      )}
      <CustomTable
        rowKey="tid"
        columns={marketColumns}
        data={trades ?? []}
        rowHeight={46}
        headerHeight={46}
        className="w-full"
        wrapperClassName="border-none !rounded-none max-w-[calc(100vw-34px)] md:max-w-none"
        includeThead={isMobile}
      />
    </div>
  );
};

export default TransactionsPanel;

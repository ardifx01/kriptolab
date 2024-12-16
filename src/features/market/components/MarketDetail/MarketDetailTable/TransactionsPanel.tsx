import React from "react";
import { useTranslation } from "react-i18next";

import CustomTable from "@/components/Table/TableCustom";
import { ColumnType } from "@/components/Table/types";
import useWindowSize from "@/hooks/useWindowSize";
import { formatDate } from "@/lib/helpers";
import { ITradeHistory } from "@/types";

const TransactionsPanel = ({ trades }: { trades: ITradeHistory[] }) => {
  const { i18n } = useTranslation();
  const { isMobile } = useWindowSize();

  const THEAD: string[] = ["Date", "Type", "Price", "Amount"];

  const marketColumns: ColumnType<ITradeHistory>[] = [
    {
      key: "date",
      label: "Date",
      width: isMobile ? 200 : "25%",
      className: "border-r border-borderColor px-3",
      customRender(value, rowData) {
        return (
          <span
            className={rowData.type === "buy" ? "text-success" : "text-error"}
          >
            {formatDate(
              value || "",
              i18n.language === "id" ? "id-ID" : "en-GB",
              true,
            )}
          </span>
        );
      },
    },
    {
      key: "type",
      label: "Type",
      width: isMobile ? 200 : "25%",
      className: "border-r border-borderColor capitalize px-3",
      customRender(value, rowData) {
        return (
          <span
            className={rowData.type === "buy" ? "text-success" : "text-error"}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "price",
      label: "Price",
      width: isMobile ? 200 : "25%",
      className: "border-r border-borderColor px-3",
      customRender(value, rowData) {
        return (
          <span
            className={rowData.type === "buy" ? "text-success" : "text-error"}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "amount",
      label: "Amount",
      width: isMobile ? 200 : "25%",
      className: "px-3 border-r border-transparent",
      customRender(value, rowData) {
        return (
          <span
            className={rowData.type === "buy" ? "text-success" : "text-error"}
          >
            {value}
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
              {item}
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

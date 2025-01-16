import React from "react";
import { useTranslation } from "react-i18next";
import { GoStar, GoStarFill } from "react-icons/go";

import Image from "next/image";
import { useRouter } from "next/router";

import classNames from "classnames";

import Shimmer from "@/components/Loader/Shimmer";
import CustomTable from "@/components/Table/TableCustom";
import { ColumnType } from "@/components/Table/types";
import usePagination from "@/hooks/usePagination";
import useWindowSize from "@/hooks/useWindowSize";
import { calculatePercentageChange, formatVolume } from "@/lib/helpers";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { scrollToTop } from "@/lib/helpers/scrollTop";
import { ITokenDetails } from "@/types";
import { IMarketTableType } from "@/types/tableDataTypes";

import useWatchlist from "../../hooks/useWatchlist";

import Pagination from "./Pagination";

export interface MarketTableProps {
  tokenList: ITokenDetails[];
  isLoading: boolean;
  className?: string;
}

const MarketTable = ({ tokenList, isLoading, className }: MarketTableProps) => {
  const router = useRouter();
  const { isMobile } = useWindowSize();

  const { updateWatchlist, watchlist } = useWatchlist();
  const { t } = useTranslation();

  const itemsPerPage = isMobile ? 15 : 30;

  const marketColumns: ColumnType<IMarketTableType>[] = [
    {
      key: "watchlist" as any,
      label: "",
      width: isMobile ? 40 : 50,
      customRender: (_, rowData) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            updateWatchlist(rowData.pair);
          }}
          className="flex items-center justify-center pl-3"
        >
          {rowData.isWatchlisted ? (
            <GoStarFill className="text-warning" />
          ) : (
            <GoStar className="hover:text-warning" />
          )}
        </div>
      ),
    },
    {
      key: "index" as any,
      label: "#",
      width: isMobile ? 40 : 50,
      className: "text-center",
    },
    {
      key: "assetName",
      label: t("Token Name"),
      width: isMobile ? 200 : 280,
      headerClassName: "text-left px-3",
      customRender: (val, rowData: any) => (
        <div className="flex items-center gap-3 px-3">
          <Image
            src={rowData.pairDetails.url_logo || ""}
            alt={rowData.pairDetails.id || "Crypto"}
            className={classNames(
              "h-6 w-6 rounded-full",
              (rowData.pairDetails.traded_currency === "omg" ||
                rowData.pairDetails.traded_currency === "btt") &&
                "bg-white",
            )}
            width={32}
            height={32}
            loading="lazy"
          />
          {val}
        </div>
      ),
    },
    {
      key: "pair",
      label: t("Token Pair"),
      width: isMobile ? 100 : 160,
      headerClassName: "text-left",
      customRender: (_, rowData: any) => (
        <span>{rowData.pairDetails.description}</span>
      ),
    },
    {
      key: "price",
      label: t("Price"),
      width: 180,
      type: "number",
      headerClassName: "text-right px-4",
      className: "flex h-[60px] items-center justify-end px-4",
      customRender: (value, rowData: any) =>
        formatCurrencyValue(
          parseFloat(value || "0"),
          rowData.pairDetails?.base_currency?.toUpperCase() || "IDR",
          true,
        ),
    },
    {
      key: "volume_24h",
      label: t("24h Volume"),
      width: isMobile ? 180 : 200,
      type: "number",
      headerClassName: "text-right px-4",
      className: "text-right px-4",
      customRender: (value) => formatVolume(value),
    },
    {
      key: "change_24h",
      label: t("24h Change"),
      width: isMobile ? 158 : 178,
      type: "number",
      headerClassName: "text-right px-4",
      className: "text-right px-4",
      customRender: (value) => (
        <span
          className={classNames(
            value.isPositive ? "text-success" : "text-error",
          )}
        >
          {value.formatted}
        </span>
      ),
    },
    {
      key: "change_7d",
      label: t("7d Change"),
      width: isMobile ? 160 : 180,
      type: "number",
      headerClassName: "text-right px-4 pr-6",
      className: "text-right px-4 pr-6",
      customRender: (value) => (
        <span
          className={classNames(
            value.isPositive ? "text-success" : "text-error",
          )}
        >
          {value.formatted}
        </span>
      ),
    },
  ];

  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePagination({
      itemsPerPage,
      data: tokenList,
    });

  const tableData = currentItems.map((token, index) => ({
    ...token,
    index: (currentPage - 1) * itemsPerPage + index + 1, // Adjust index for current page
    isWatchlisted: watchlist.includes(token.pairDetails?.ticker_id ?? ""),
    assetName: token.priceDetails?.name ?? "",
    pair: token.pairDetails?.ticker_id ?? "",
    price: token.priceDetails?.last ?? "0",
    volume_24h: token.priceDetails?.vol_quoted ?? "0",
    change_24h: calculatePercentageChange(
      token.priceDetails?.last ?? 0,
      token.priceDetails?.price_24h ?? 0,
    ),
    change_7d: calculatePercentageChange(
      token.priceDetails?.last ?? 0,
      token.priceDetails?.price_7d ?? 0,
    ),
  }));

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-xl rounded-t-none border border-t-0 border-borderColor lg:rounded-t-xl lg:border-t">
        <CustomTable
          columns={marketColumns}
          data={tableData ?? []}
          wrapperClassName="border-none !rounded-none max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-34px)]"
          rowKey="pair"
          headerHeight={isMobile ? 50 : 64}
          trHeaderClassName="text-sm bg-transparent lg:bg-cardBackground border-b border-borderColor lg:border-none lg:text-base"
          bodyClassName="text-sm lg:text-base"
          rowHeight={isMobile ? 60 : 64}
          onRowClick={(row) => router.push(`/market/${row.pair}`)}
        />
        {isLoading && (
          <div className="w-full border-b border-borderColor px-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex gap-3">
                <Shimmer className="my-4 h-9 w-[3%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[3%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[25%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[14%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[20%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[18%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[17%] rounded-md" />
              </div>
            ))}
          </div>
        )}
        {tableData.length === 0 && !isLoading && (
          <div className="flex h-[200px] w-full items-center justify-center border-b border-borderColor">
            <span className="mb-4">{t("No Token Data")}</span>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          handlePageChange(page);
          scrollToTop();
        }}
      />
    </div>
  );
};

export default MarketTable;

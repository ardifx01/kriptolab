import React from "react";
import { useTranslation } from "react-i18next";
import { GoStar, GoStarFill } from "react-icons/go";

import Image from "next/image";
import { useRouter } from "next/router";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import CustomTable from "@/components/Table/TableCustom";
import { ColumnType } from "@/components/Table/types";
import usePagination from "@/hooks/usePagination";
import useWindowSize from "@/hooks/useWindowSize";
import { calculatePercentageChange, formatVolume } from "@/lib/helpers";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { scrollToTop } from "@/lib/helpers/scrollTop";
import { ITokenDetails } from "@/types";
import { IMarketTableType } from "@/types/tableDataTypes";

import useTokenData from "../../hooks/useTokenData";
import useWatchlist from "../../hooks/useWatchlist";

export interface MarketTableProps {
  tokenList: ITokenDetails[];
}

const itemsPerPage = 50;

const MarketTable = ({ tokenList }: MarketTableProps) => {
  const router = useRouter();
  const { isMobile } = useWindowSize();
  const { filteredTokens, searchToken } = useTokenData();
  const { updateWatchlist, watchlist } = useWatchlist();
  const { t } = useTranslation();

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
      headerClassName: "text-left p-3",
      customRender: (val, rowData: any) => (
        <div className="flex items-center gap-3 p-3">
          <Image
            src={rowData.pairDetails.url_logo || ""}
            alt={rowData.priceDetails?.name || "Crypto"}
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
      headerClassName: "text-right p-4",
      className: "flex h-[60px] items-center justify-end p-4",
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
      headerClassName: "text-right p-4",
      className: "text-right p-4",
      customRender: (value) => formatVolume(value),
    },
    {
      key: "change_24h",
      label: t("24h Change"),
      width: isMobile ? 158 : 178,
      type: "number",
      headerClassName: "text-right p-4",
      className: "text-right p-4",
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
      headerClassName: "text-right p-4 pr-6",
      className: "text-right p-4 pr-6",
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

  const {
    currentItems,
    currentPage,
    totalPages,
    totalPagesArray,
    handlePageChange,
  } = usePagination({
    itemsPerPage,
    data: filteredTokens(tokenList, searchToken),
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
    <div>
      <div className="rounded-xl rounded-b-none border border-b-0 border-borderColor">
        <CustomTable
          columns={marketColumns}
          data={tableData ?? []}
          wrapperClassName="border-none !rounded-none max-w-[calc(100vw-2rem)] md:max-w-none"
          rowKey="pair"
          rowHeight={64}
          onRowClick={(row) => router.push(`/market/${row.pair}`)}
        />
        {tableData.length === 0 && (
          <div className="flex h-[200px] w-full items-center justify-center border-b border-borderColor">
            <span className="mb-4">{t("No Token Data")}</span>
          </div>
        )}
      </div>

      <div className="md::gap-4 mt-6 flex flex-wrap gap-2 md:justify-center">
        <Button
          onClick={() => {
            handlePageChange(currentPage - 1);
            scrollToTop();
          }}
          disabled={currentPage === 1}
        >
          {t("Previous")}
        </Button>

        {totalPagesArray.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "primary" : "secondary"}
            onClick={() => {
              handlePageChange(page);
              scrollToTop();
            }}
            className={classNames(
              "flex h-10 w-10 items-center justify-center sm:w-auto",
              currentPage !== page && "bg-transparent",
            )}
          >
            {page}
          </Button>
        ))}
        <Button
          onClick={() => {
            handlePageChange(currentPage + 1);
            scrollToTop();
          }}
          disabled={currentPage === totalPages}
        >
          {t("Next")}
        </Button>
      </div>
    </div>
  );
};

export default MarketTable;

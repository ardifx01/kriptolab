import React from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import { useRouter } from "next/router";

import classNames from "classnames";

import Shimmer from "@/components/Loader/Shimmer";
import CustomTable from "@/components/Table/TableCustom";
import { ColumnType } from "@/components/Table/types";
import useTokenData from "@/features/market/hooks/useTokenData";
import useWindowSize from "@/hooks/useWindowSize";
import { calculatePercentageChange, formatVolume } from "@/lib/helpers";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { IMarketTableType } from "@/types/tableDataTypes";

const LandingMarketTable = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { landingPageTokens, isLoading } = useTokenData();
  const { isMobile } = useWindowSize();

  // MARKET TABLE
  const marketColumns: ColumnType<IMarketTableType>[] = [
    {
      key: "assetName",
      label: t("Token Name"),
      width: isMobile ? 200 : 300,
      headerClassName: "text-left p-3 pl-6 md:pl-7",
      customRender: (val, rowData: any) => (
        <div className="flex items-center gap-3 p-3 pl-6 md:pl-7">
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
      width: isMobile ? 100 : 120,
      headerClassName: "text-left pl-5 md:pl-0",
      customRender: (_, rowData: any) => (
        <span className="pl-5 md:pl-0">{rowData.pairDetails.description}</span>
      ),
    },
    {
      key: "price",
      label: t("Price"),
      width: 220,
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
      width: isMobile ? 160 : 200,
      type: "number",
      headerClassName: "text-right p-4",
      className: "text-right p-4",
      customRender: (value) => formatVolume(value),
    },
    {
      key: "change_24h",
      label: t("24h Change"),
      width: isMobile ? 158 : 218,
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
      width: isMobile ? 160 : 220,
      type: "number",
      headerClassName: "text-right p-4 pr-7",
      className: "text-right p-4 pr-7",
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

  const tableData = landingPageTokens.map((token) => ({
    ...token,
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
    <section className="mt-12 rounded-xl border border-borderColor md:mt-[80px]">
      <CustomTable
        columns={marketColumns}
        data={tableData ?? []}
        wrapperClassName="border-none !rounded-none max-w-[calc(100vw-2rem)] md:max-w-none"
        rowKey="pair"
        rowHeight={64}
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
    </section>
  );
};

export default LandingMarketTable;

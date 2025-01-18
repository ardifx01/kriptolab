import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import { useRouter } from "next/router";

import classNames from "classnames";
import { SearchIcon } from "lucide-react";

import CustomTable from "@/components/Table/TableCustom";
import { ColumnType } from "@/components/Table/types";
import useTokenData from "@/features/market/hooks/useTokenData";
import usePortfolio from "@/hooks/usePortfolio";
import useWindowSize from "@/hooks/useWindowSize";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { IAssetTableType } from "@/types/tableDataTypes";

const PortfolioAssets = () => {
  const { assets } = usePortfolio();
  const { getTokenById } = useTokenData();
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const { t } = useTranslation();

  const [searchToken, setSearchToken] = useState("");

  const assetColumns: ColumnType<IAssetTableType>[] = [
    {
      key: "name",
      label: t("Name"),
      width: isMobile ? 200 : "25%",
      headerClassName: "text-left p-3 px-5",
      customRender: (val, rowData: any) => (
        <div className="flex items-center gap-3 p-3 px-5">
          <Image
            src={rowData.pairDetails.url_logo || "/images/user-default.png"}
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
      key: "symbol",
      label: t("Symbol"),
      width: isMobile ? 120 : "5%",
      headerClassName: "text-left",
      customRender: (_, rowData: any) => (
        <span>{rowData.pairDetails.traded_currency_unit.toUpperCase()}</span>
      ),
    },
    {
      key: "amount",
      label: t("Amount"),
      width: isMobile ? 150 : "35%",
      type: "number",
      headerClassName: "text-right p-4",
      className: "flex h-[60px] items-center justify-end p-4",
      customRender: (value) => value.toFixed(4),
    },
    {
      key: "valueIdr",
      label: t("Value (IDR)"),
      width: isMobile ? 250 : "35%",
      type: "number",
      headerClassName: "text-right p-4 px-5",
      className: "text-right p-4 px-5",
      customRender: (value) =>
        formatCurrencyValue(parseFloat(value || "0"), "IDR", true),
    },
  ];

  const data = assets.map((asset) => {
    const token = getTokenById(asset.pair_id);

    return {
      name: token?.priceDetails?.name || "",
      symbol: asset.symbol || "",
      amount: asset.totalAmount || 0,
      valueIdr:
        asset.totalAmount *
        parseFloat(token?.priceDetails ? token.priceDetails.last : "0"),
      pairDetails: token?.pairDetails,
      priceDetails: token?.priceDetails,
    };
  });

  const filteredData = data.filter((token) => {
    if (!searchToken.trim()) return true;

    const normalizedSearch = searchToken.toLowerCase().trim();

    return (
      token.name.toLowerCase().includes(normalizedSearch) ||
      token.symbol.toLowerCase().includes(normalizedSearch)
    );
  });

  return (
    <div className="space-y-4">
      <div
        id="portfolio-search"
        className={classNames(
          "flex h-10 w-64 items-center rounded-lg border px-3 font-inter transition-all duration-300 lg:h-12 lg:w-96 lg:border-2",
          "cursor-text border-borderColor bg-cardBackground/60 text-textSecondary",
        )}
      >
        <SearchIcon className="min-h-5 min-w-5" />
        <input
          type="text"
          className={classNames(
            "ml-2 h-full w-full bg-transparent transition-all duration-300 placeholder:text-sm placeholder:text-gray-500",
            "outline-none focus:outline-none focus:ring-0 lg:placeholder:text-base",
          )}
          placeholder="Search tokens"
          value={searchToken}
          onChange={(v) => setSearchToken(v.target.value)}
        />
      </div>

      <div
        id="asset-table"
        className="overflow-hidden rounded-lg border border-b-0 border-borderColor"
      >
        <CustomTable
          columns={assetColumns}
          data={filteredData || []}
          rowKey={"name"}
          wrapperClassName="border-b border-t-0 border-x-0 !rounded-none max-w-[calc(100vw-2rem)] md:max-w-none"
          className="w-full"
          onRowClick={(row) =>
            router.push(`/market/${row.symbol.toLowerCase()}_idr`)
          }
        />
        {filteredData.length === 0 && (
          <div className="flex h-[200px] w-full items-center justify-center border-b border-borderColor">
            <span className="mb-4">{t("No Token Data")}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioAssets;

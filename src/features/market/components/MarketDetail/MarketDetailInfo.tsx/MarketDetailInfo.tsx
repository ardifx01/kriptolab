import React from "react";
import { FaDollarSign } from "react-icons/fa6";
import { IoTrendingDown, IoTrendingUp } from "react-icons/io5";
import { LuBarChart3 } from "react-icons/lu";

import Image from "next/image";

import classNames from "classnames";

import { calculatePercentageChange, formatVolume } from "@/lib/helpers";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { ITokenDetails } from "@/types";

interface Props {
  token?: ITokenDetails;
}

const MarketDetailInfo = ({ token }: Props) => {
  const tokenPair = token?.pairDetails;
  const tokenPrice = token?.priceDetails;
  const currentPrice = parseFloat(tokenPrice?.last || "0");
  const prevPrice = parseFloat(tokenPrice?.price_24h || "0");
  const priceChange = calculatePercentageChange(currentPrice, prevPrice);

  const InfoboxData = [
    {
      title: "High",
      value: formatCurrencyValue(
        parseFloat(tokenPrice?.high || "0"),
        tokenPair?.base_currency?.toUpperCase() || "IDR",
        true,
      ),
      icon: <IoTrendingUp className="h-4 w-4 text-success" />,
    },
    {
      title: "Low",
      value: formatCurrencyValue(
        parseFloat(tokenPrice?.low || "0"),
        tokenPair?.base_currency?.toUpperCase() || "IDR",
        true,
      ),
      icon: <IoTrendingDown className="h-4 w-4 text-error" />,
    },
    {
      title: `Vol 24H ${tokenPair?.base_currency?.toUpperCase()}`,
      value: formatVolume(tokenPrice?.vol_quoted || "0"),
      icon: <FaDollarSign className="h-[14px] w-[14px] text-blue-500" />,
    },
    {
      title: `Vol 24H ${tokenPair?.traded_currency?.toUpperCase()}`,
      value: formatVolume(tokenPrice?.vol_base || "0"),
      icon: <LuBarChart3 className="h-4 w-4 text-purple-500" />,
    },
  ];

  return (
    <div
      className={classNames(
        "w-full overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-xl",
        "border border-borderColor bg-gradient-to-br from-cardBackground to-cardBackground/40",
      )}
    >
      <div
        className={classNames(
          "flex h-16 items-center gap-3 rounded-t-xl border-b-2 p-4 backdrop-blur-sm",
          "border-borderColor bg-cardBackground/80",
        )}
      >
        <div className="relative h-9 w-9 overflow-hidden rounded-full">
          <Image
            src={tokenPair?.url_logo || ""}
            alt={tokenPrice?.name || "Crypto"}
            className={classNames(
              "h-full w-full object-cover",
              (tokenPair?.traded_currency === "omg" ||
                tokenPair?.traded_currency === "btt") &&
                "bg-white",
            )}
            width={36}
            height={36}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-sora font-medium">{tokenPrice?.name}</span>
          <span className="text-xs text-textSecondary">
            {tokenPair?.description}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-end gap-2">
          <div>
            <span className="text-xs text-textSecondary lg:text-sm">
              Current Price
            </span>
            <h3 className="font-bold lg:text-xl">
              {formatCurrencyValue(
                currentPrice,
                tokenPair?.base_currency?.toUpperCase() || "IDR",
                true,
              )}
            </h3>
          </div>
          <div
            className={classNames(
              "mb-0.5 rounded-full px-2 py-0.5 text-xs lg:text-sm",
              priceChange.percentage === 0
                ? "bg-gray-500/10 text-textSecondary"
                : priceChange.percentage > 0
                  ? "bg-green-500/10 text-success"
                  : "bg-red-500/10 text-error",
            )}
          >
            {priceChange.formatted}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {InfoboxData.map((data, index) => (
            <div
              key={index}
              className="group flex flex-col items-center rounded-lg border border-borderColor bg-cardBackground/60 py-3 transition-all hover:bg-cardBackground/80"
            >
              <div className="mb-1 flex items-center gap-1.5">
                {data.icon}
                <span className="text-xs text-textSecondary">{data.title}</span>
              </div>
              <span className="text-sm font-medium lg:text-base">
                {data.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDetailInfo;

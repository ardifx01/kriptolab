import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Bitcoin } from "lucide-react";

import { PriceChangeResult } from "@/lib/helpers";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { ITokenPair, ITokenPrice } from "@/types";

interface TokenItemProps {
  token: {
    percentage: PriceChangeResult;
    pairDetails: ITokenPair;
    priceDetails?: ITokenPrice;
  };
}

const TokenItem = ({ token }: TokenItemProps) => {
  const { reload } = useRouter();

  return (
    <Link
      href={`/market/${token.pairDetails.ticker_id}`}
      className="flex items-center gap-2 px-4 py-2 hover:bg-cardBackground"
      onClick={reload}
    >
      {token.pairDetails.url_logo ? (
        <Image
          src={token.pairDetails.url_logo}
          alt={token.pairDetails.id}
          width={32}
          height={32}
          loading="lazy"
          className="h-6 w-6 rounded-full"
        />
      ) : (
        <Bitcoin className="size-6" />
      )}

      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm font-bold text-textPrimary">
            {token.priceDetails?.name}
          </p>
          <p className="text-xs text-textSecondary">
            {token.pairDetails.traded_currency_unit}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-textPrimary">
            {formatCurrencyValue(
              parseFloat(token.priceDetails?.last || "0"),
              token.pairDetails?.base_currency?.toUpperCase() || "IDR",
              true,
            )}
          </p>
          <div className="flex items-center justify-end text-xs">
            <span
              className={`font-medium ${
                token.percentage.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {token.percentage.formatted}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TokenItem;

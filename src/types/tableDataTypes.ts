import { PriceChangeResult } from "@/lib/helpers";

import { ITokenDetails } from ".";

export interface IMarketTableType {
  isWatchlisted?: boolean;
  assetName: string;
  pair: string;
  price: string;
  volume_24h: string;
  change_24h: PriceChangeResult;
  change_7d: PriceChangeResult;
}

export interface IAssetTableType {
  name: string;
  symbol: string;
  amount: number | string;
  valueIdr: number | string;
  pairDetails?: ITokenDetails["pairDetails"];
  priceDetails?: ITokenDetails["priceDetails"];
}

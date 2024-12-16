/* eslint-disable no-unused-vars */
export type valueSeparatorType = "none" | "space" | "comma";

export interface IAccount {
  firstName?: string;
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}
export interface IResetPassword {
  token: string;
  newPassword: string;
}

export interface IUser {
  _id: string;
  email: string;
  role: string;
  provider: string;
  profile: IProfile;
  createdAt: string;
  updatedAt: string;
}

export interface IProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  image: string;
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  BUY = "BUY",
  SELL = "SELL",
}

export interface ITransaction {
  _id: string;
  userId: string;
  type: TransactionType;
  base_currency: string;
  traded_currency: string;
  base_amount: string;
  traded_amount: string;
  price?: string;
  fee?: string;
  fee_currency?: string;
  date?: Date;
  pair_id?: string;
}

export interface IEditPassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ITokenPair {
  id: string;
  symbol: string;
  base_currency: string;
  traded_currency: string;
  traded_currency_unit: string;
  description: string;
  ticker_id: string; // SAME WITH pair_id from ITokenPrice
  volume_precision: number;
  price_precision: number;
  price_round: number;
  pricescale: number;
  trade_min_base_currency: number;
  trade_min_traded_currency: number;
  trade_fee_percent: number;
  trade_fee_percent_taker: number;
  trade_fee_percent_maker: number;
  url_logo?: string;
  url_logo_png?: string;
  is_maintenance: boolean;
  is_market_suspended: boolean;
  coingecko_id?: string;
  cmc_id?: number;
  old_ticker_id?: string;
}

export interface ITokenPrice {
  pair_id: string; // SAME WITH ticker_id from ITokenPair
  high: string;
  low: string;
  vol_base: string;
  vol_quoted: string;
  last: string;
  buy: string;
  sell: string;
  server_time: number;
  name: string;
  price_24h?: string;
  price_7d?: string;
}

export interface ITokenDetails {
  pairDetails: ITokenPair;
  priceDetails?: ITokenPrice;
}

export interface ITradeHistory {
  date: string;
  price: string;
  amount: string;
  tid: string;
  type: string;
}

export interface ITokenOHLC {
  Time: number;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: string;
}

export interface INews {
  title: string | undefined;
  date: string | undefined;
  author: any;
  link: string | undefined;
  image: string | null;
}

export interface IDailyVolume {
  date: Date;
  total_volume_idr: number;
  total_volume_usd: number;
  idr_usd_rate: number;
  total_trades: number;
}

export type MarketMenuType =
  | "Watchlist"
  | "View All"
  | "Trending"
  | "Top Gainers";

export type MarketDetailTableType = "transactions" | "my-trades" | "news";

export interface IAssetBalance {
  symbol: string;
  pair_id: string;
  totalAmount: number;
}

export type quickAddPercentage = 25 | 50 | 75 | 100;
export const quickAddPercentage: quickAddPercentage[] = [25, 50, 75, 100];

export interface IProfileUpdate {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

export type historyRangeType = "1D" | "1W" | "1M" | "ALL";
export const historyRange: historyRangeType[] = ["1D", "1W", "1M", "ALL"];

export interface IPortoHistory {
  _id: string;
  totalInIDR: number;
  timestamp: string;
}

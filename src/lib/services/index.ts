import {
  API_BUY,
  API_DEPOSIT,
  API_EDIT_PASSWORD,
  API_FORGOT_PASSWORD,
  API_LOGIN,
  API_PROFILE,
  API_REGISTER,
  API_RESET_PASSWORD,
  API_SELL,
  API_WITHDRAW,
} from "@/constants";
import {
  IAccount,
  IEditPassword,
  IProfileUpdate,
  IResetPassword,
} from "@/types";

import { AuthenticatedAPI, UnauthenticatedAPI } from "./config";

// TYPES
type TradeServiceParams = {
  symbol: string;
  amount: number;
  price: number;
};

// AUTH ========================================
export const registerService = async (data: IAccount) => {
  return await UnauthenticatedAPI.post(API_REGISTER, data);
};

export const loginService = async (data: IAccount) => {
  return await UnauthenticatedAPI.post(API_LOGIN, data);
};

export const forgotPasswordService = async (email: string) => {
  return await UnauthenticatedAPI.post(API_FORGOT_PASSWORD, { email });
};

export const resetPasswordService = async (data: IResetPassword) => {
  return await UnauthenticatedAPI.post(API_RESET_PASSWORD, data);
};

// PROFILE ========================================
export const editProfileService = async (data: IProfileUpdate) => {
  return await AuthenticatedAPI.put(API_PROFILE, data);
};

export const editProfilePictureService = async (imgUrl: string) => {
  return await AuthenticatedAPI.put(API_PROFILE, { image: imgUrl });
};
export const editPasswordService = async (data: IEditPassword) => {
  return await AuthenticatedAPI.put(API_EDIT_PASSWORD, data);
};

// TRANSACTION ========================================
export const depositService = async (depositAmount: number) => {
  return await AuthenticatedAPI.post(API_DEPOSIT, { amount: depositAmount });
};

export const buyService = async ({
  symbol,
  amount,
  price,
}: TradeServiceParams) => {
  return await AuthenticatedAPI.post(API_BUY, { symbol, amount, price });
};

export const sellService = async ({
  symbol,
  amount,
  price,
}: TradeServiceParams) => {
  return await AuthenticatedAPI.post(API_SELL, { symbol, amount, price });
};

export const withdrawService = async (withdrawAmount: number) => {
  return await AuthenticatedAPI.post(API_WITHDRAW, { amount: withdrawAmount });
};

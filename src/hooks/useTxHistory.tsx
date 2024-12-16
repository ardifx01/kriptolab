import { useMemo } from "react";

import { API_TRANSACTION_HISTORY } from "@/constants";
import useAuth from "@/features/auth/hooks/useAuth";
import { ITransaction } from "@/types";

import { useCustomSWR } from "./useCustomSWR";

const useTxHistory = () => {
  const { isLoggedIn } = useAuth();

  const {
    data,
    error,
    isLoading: txLoading,
  } = useCustomSWR<ITransaction[]>(
    isLoggedIn ? API_TRANSACTION_HISTORY : null,
    "authenticated",
  );

  const txBuyHistory = useMemo(() => {
    if (!data || error || !isLoggedIn) return [];

    const txHistory = data.filter((tx) => tx.type === "BUY");

    return txHistory;
  }, [data, error, isLoggedIn]);

  const txSellHistory = useMemo(() => {
    if (!data || error || !isLoggedIn) return [];

    const txHistory = data.filter((tx) => tx.type === "SELL");

    return txHistory;
  }, [data, error, isLoggedIn]);

  const txDepositHistory = useMemo(() => {
    if (!data || error || !isLoggedIn) return [];

    const txHistory = data.filter((tx) => tx.type === "DEPOSIT");

    return txHistory;
  }, [data, error, isLoggedIn]);

  const txWithdrawalHistory = useMemo(() => {
    if (!data || error || !isLoggedIn) return [];

    const txHistory = data.filter((tx) => tx.type === "WITHDRAWAL");

    return txHistory;
  }, [data, error, isLoggedIn]);

  return {
    data,
    txBuyHistory,
    txSellHistory,
    txDepositHistory,
    txWithdrawalHistory,
    txLoading,
  };
};

export default useTxHistory;

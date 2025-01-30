import { useMemo } from "react";

import { API_TOKEN_TRANSACTION_HISTORY } from "@/constants";
import useAuth from "@/features/auth/hooks/useAuth";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { ITokenDetails, ITransaction } from "@/types";

const useTxUser = (token?: ITokenDetails) => {
  const { isLoggedIn } = useAuth();

  const API_URL = `${API_TOKEN_TRANSACTION_HISTORY}?pair_id=${token?.priceDetails?.pair_id}`;

  const { data, error, isLoading, mutate } = useCustomSWR<ITransaction[]>(
    isLoggedIn ? API_URL : null,
    "authenticated",
  );

  const myTrades = useMemo(() => {
    if (!data || error || !isLoggedIn) return [];

    return data;
  }, [error, isLoggedIn, data]);

  return { myTrades, isLoading, refreshTxUser: mutate };
};

export default useTxUser;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_PORTFOLIO, API_PORTFOLIO_ASSET_IDR_VALUE } from "@/constants";
import useAuth from "@/features/auth/hooks/useAuth";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { setAssets, setIDRBalance } from "@/redux/reducers/portfolioSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { IAssetBalance } from "@/types";

const usePortfolio = () => {
  const { idrBalance, assets } = useSelector(
    (state: RootState) => state.portfolio,
  );
  const dispatch: AppDispatch = useDispatch();

  const { isLoggedIn } = useAuth();

  // Fetch the latest portfolio balances
  const {
    data,
    error,
    isLoading,
    mutate: refreshBalance,
  } = useCustomSWR<{
    idrBalance: number;
    assets: IAssetBalance[];
  }>(isLoggedIn ? API_PORTFOLIO : null, "authenticated");

  const {
    data: assetIdrValue,
    error: errorAssetIdrValue,
    isLoading: isLoadingAssetIdrValue,
    mutate: refreshAssetIdrValue,
  } = useCustomSWR<number>(
    isLoggedIn ? API_PORTFOLIO_ASSET_IDR_VALUE : null,
    "authenticated",
  );

  useEffect(() => {
    if (data && !error && isLoggedIn) {
      dispatch(setIDRBalance(data.idrBalance));
      dispatch(setAssets(data.assets));
    } else {
      dispatch(setIDRBalance(0));
      dispatch(setAssets([]));
    }
  }, [data, dispatch, error, isLoggedIn]);

  const getAssetBalance = (symbol: string) => {
    return (
      assets.find((v) => v.symbol.toLowerCase() === symbol.toLowerCase())
        ?.totalAmount ?? 0
    );
  };

  const formattedBalance = idrBalance.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedAssetIdrValue = assetIdrValue?.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return {
    idrBalance,
    assetIdrValue,
    assets,
    error,
    formattedBalance,
    formattedAssetIdrValue,
    errorAssetIdrValue,
    getAssetBalance,
    isLoading: () => {
      return isLoading || isLoadingAssetIdrValue;
    },
    refreshBalance: async () => {
      await refreshBalance();
      await refreshAssetIdrValue();
    },
  };
};

export default usePortfolio;

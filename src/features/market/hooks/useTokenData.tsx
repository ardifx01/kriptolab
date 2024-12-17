import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_PAIRS, API_SUMMARIES } from "@/constants";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { calculatePercentageChange } from "@/lib/helpers";
import {
  setSearchToken,
  setTokenPairsData,
  setTokenPricesData,
} from "@/redux/reducers/cryptoToken";
import { RootState } from "@/redux/store";
import { ITokenDetails, ITokenPair, ITokenPrice } from "@/types";

const useTokenData = () => {
  const { tokenPairsData, tokenPricesData, searchToken } = useSelector(
    (state: RootState) => state.cryptoToken,
  );
  const { watchlist } = useSelector((state: RootState) => state.globalSettings);
  const dispatch = useDispatch();

  // Fetch data
  const {
    data: pairList,
    error: pairsError,
    isLoading: isPairsLoading,
    mutate: mutatePairs,
  } = useCustomSWR<ITokenPair[]>(API_PAIRS, "unauthenticated", {
    refreshInterval: 1000 * 60 * 5,
  });

  const {
    data: priceList,
    error: pricesError,
    isLoading: isPricesLoading,
    mutate: mutatePrices,
  } = useCustomSWR<ITokenPrice[]>(API_SUMMARIES, "unauthenticated", {
    refreshInterval: 1000 * 15,
    revalidateOnFocus: true,
    revalidateIfStale: true,
  });

  // Redux updates
  const updateTokenPairsData = useCallback(
    (val: ITokenPair[]) => {
      dispatch(setTokenPairsData(val));
    },
    [dispatch],
  );

  const updateTokenPricesData = useCallback(
    (val: ITokenPrice[]) => {
      dispatch(setTokenPricesData(val));
    },
    [dispatch],
  );

  const updateSearchToken = useCallback(
    (val: string) => {
      dispatch(setSearchToken(val));
    },
    [dispatch],
  );

  // Update Redux when data changes
  useEffect(() => {
    if (pairList) {
      updateTokenPairsData(pairList);
    }
  }, [pairList, updateTokenPairsData]);

  useEffect(() => {
    if (priceList) {
      updateTokenPricesData(priceList);
    }
  }, [priceList, updateTokenPricesData]);

  // TOKEN LIST
  const tokenList = useMemo<ITokenDetails[]>(() => {
    if (!tokenPairsData) return [];

    return tokenPairsData.map((pair) => ({
      pairDetails: { ...pair },
      priceDetails: tokenPricesData.find(
        (token) => token.pair_id === pair.ticker_id,
      ),
    }));
  }, [tokenPairsData, tokenPricesData]);

  // const tokenIDRList = useMemo<ITokenDetails[]>(() => {
  //   if (!tokenList) return [];

  //   return tokenList.filter(
  //     (token) => token.pairDetails.base_currency === "idr",
  //   );
  // }, [tokenList]);

  // Trending Crypto
  const trendingCrypto = useMemo(() => {
    if (!tokenList) return [];

    return tokenList
      .filter((token) => {
        // Filter out tokens without price details or volume data
        return (
          token.priceDetails?.vol_quoted &&
          !token.pairDetails.is_maintenance &&
          !token.pairDetails.is_market_suspended &&
          token.pairDetails.id !== "usdtidr"
        );
      })
      .sort((a, b) => {
        // Convert volume strings to numbers for comparison
        const volumeA = parseFloat(a.priceDetails?.vol_quoted || "0");
        const volumeB = parseFloat(b.priceDetails?.vol_quoted || "0");
        return volumeB - volumeA; // Sort in descending order
      })

      .map((token) => ({
        ...token,
        percentage: calculatePercentageChange(
          token.priceDetails?.last || 0,
          token.priceDetails?.price_24h || 0,
        ),
      }));
  }, [tokenList]);

  // Top Gainers
  const topGainers = useMemo(() => {
    if (!tokenList) return [];

    return tokenList
      .filter((token) => {
        // Filter out tokens without price or percentage gain data
        return (
          token.priceDetails?.last &&
          token.priceDetails?.price_24h &&
          !token.pairDetails.is_maintenance &&
          !token.pairDetails.is_market_suspended
        );
      })
      .map((token) => {
        return {
          ...token,
          percentage: calculatePercentageChange(
            token?.priceDetails?.last || "0",
            token?.priceDetails?.price_24h || "0",
          ),
        };
      })
      .sort((a, b) => b.percentage.percentage - a.percentage.percentage);
  }, [tokenList]);

  // Top Losers
  const topLosers = useMemo(() => {
    if (!tokenList) return [];

    return tokenList
      .filter((token) => {
        // Filter out tokens without price or percentage gain data
        return (
          token.priceDetails?.last &&
          token.priceDetails?.price_24h &&
          !token.pairDetails.is_maintenance &&
          !token.pairDetails.is_market_suspended
        );
      })
      .map((token) => {
        return {
          ...token,
          percentage: calculatePercentageChange(
            token?.priceDetails?.last || "0",
            token?.priceDetails?.price_24h || "0",
          ),
        };
      })
      .sort((a, b) => a.percentage.percentage - b.percentage.percentage);
  }, [tokenList]);

  const watchlistedTokens = useMemo(() => {
    if (!tokenList) return [];

    return tokenList.filter((token) =>
      watchlist.includes(token.pairDetails.ticker_id),
    );
  }, [tokenList, watchlist]);

  // Search functionality
  const filteredTokens = (tokens: ITokenDetails[], search: string) => {
    if (!tokens || !search.trim()) return tokens || [];

    const normalizedSearch = search.toLowerCase().trim();

    return tokens.filter((token) => {
      const pair = token.pairDetails;
      const price = token.priceDetails;

      return (
        pair?.symbol.toLowerCase().includes(normalizedSearch) ||
        pair?.base_currency.toLowerCase().includes(normalizedSearch) ||
        pair?.traded_currency.toLowerCase().includes(normalizedSearch) ||
        pair?.description?.toLowerCase().includes(normalizedSearch) ||
        pair?.ticker_id.toLowerCase().includes(normalizedSearch) ||
        pair?.id.toLowerCase().includes(normalizedSearch) ||
        price?.name.toLowerCase().includes(normalizedSearch)
      );
    });
  };

  // Utility functions
  const getTokenById = useCallback(
    (pairid: string) =>
      tokenList.find((token) => token.pairDetails?.ticker_id === pairid),
    [tokenList],
  );

  // Refresh data
  const refresh = useCallback(async () => {
    await Promise.all([mutatePairs(), mutatePrices()]);
  }, [mutatePairs, mutatePrices]);

  return {
    // Data
    tokenList,
    pairList,
    priceList,
    trendingCrypto,
    topGainers,
    topLosers,
    watchlistedTokens,

    // Loading and error states
    isLoading: isPairsLoading || isPricesLoading,
    error: pairsError || pricesError,

    // Search
    searchToken,
    updateSearchToken,
    filteredTokens,

    // Redux updates
    updateTokenPairsData,
    updateTokenPricesData,

    // Utility functions
    getTokenById,
    refresh,
  };
};

export default useTokenData;

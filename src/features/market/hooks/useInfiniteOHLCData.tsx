import { useMemo } from "react";

import { INDODAX_URL } from "@/constants";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { ITokenOHLC } from "@/types";

export const useInfiniteOHLCData = (tokenId: string, timeframe: string) => {
  const timeRange = useMemo(
    () => ({
      from: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60,
      to: Math.floor(Date.now() / 1000),
    }),
    [],
  );

  const fetchUrl = useMemo(
    () =>
      `${INDODAX_URL}/tradingview/history_v2?from=${timeRange.from}&symbol=${tokenId}&tf=${timeframe}&to=${timeRange.to}`,
    [tokenId, timeframe, timeRange.from, timeRange.to],
  );

  const {
    data: fetchedData,
    error,
    isLoading,
    mutate,
  } = useCustomSWR<ITokenOHLC[]>(fetchUrl, "unauthenticated");

  const data = useMemo(() => {
    if (!fetchedData) return [];
    return fetchedData.sort((a, b) => a.Time - b.Time);
  }, [fetchedData]);

  return {
    data,
    isLoading,
    error,
    timeRange,
    mutate,
  };
};

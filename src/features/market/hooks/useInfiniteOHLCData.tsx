import { useEffect, useMemo, useRef, useState } from "react";

import { INDODAX_URL } from "@/constants";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { ITokenOHLC } from "@/types";

export const useInfiniteOHLCData = (tokenId: string, timeframe: string) => {
  const [data, setData] = useState<ITokenOHLC[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);

  const timeRange = useRef({
    from: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60,
    to: Math.floor(Date.now() / 1000),
  });

  const fetchUrl = useMemo(() => {
    return `${INDODAX_URL}/tradingview/history_v2?from=${timeRange.current.from}&symbol=${tokenId}&tf=${timeframe}&to=${timeRange.current.to}`;
  }, [timeframe, tokenId]);

  const {
    data: fetchedData,
    error,
    isLoading,
    mutate,
  } = useCustomSWR<ITokenOHLC[]>(fetchUrl, "unauthenticated", {
    refreshInterval: 1000 * 5,
    revalidateOnFocus: true,
    revalidateIfStale: true,
  });

  useEffect(() => {
    if (fetchedData && tokenId) {
      const sortedData = fetchedData.sort((a, b) => a.Time - b.Time);
      setData((prevData) => {
        // Merge new data, avoiding duplicates
        const mergedData = [...prevData];
        sortedData.forEach((newItem) => {
          const existingIndex = mergedData.findIndex(
            (item) => item.Time === newItem.Time,
          );
          if (existingIndex === -1) {
            mergedData.push(newItem);
          } else {
            mergedData[existingIndex] = newItem;
          }
        });
        return mergedData.sort((a, b) => a.Time - b.Time);
      });
      setLastUpdateTime(Date.now());
    }
  }, [fetchedData, tokenId]);

  return {
    data,
    isLoading,
    error,
    timeRange,
    lastUpdateTime,
    mutate,
  };
};

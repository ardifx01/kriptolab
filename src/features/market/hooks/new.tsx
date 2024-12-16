import { useCallback, useEffect, useState } from "react";

import { INDODAX_URL } from "@/constants";
import { ITokenOHLC } from "@/types";

export const useInfiniteOHLCData = (tokenId: string, timeframe: string) => {
  const [data, setData] = useState<ITokenOHLC[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (from: number, to: number) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${INDODAX_URL}/tradingview/history_v2?from=${from}&symbol=${tokenId}&tf=${timeframe}&to=${to}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const newData: ITokenOHLC[] = await response.json();
        setData((prevData) => {
          const combinedData = [...prevData, ...newData];
          return combinedData.sort((a, b) => a.Time - b.Time);
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("An error occurred while fetching data"),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [tokenId, timeframe],
  );

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const oneMonthAgo = now - 30 * 24 * 60 * 60;
    fetchData(oneMonthAgo, now);
  }, [fetchData]);

  const loadMore = useCallback(() => {
    if (data.length > 0) {
      const oldestTimestamp = Math.min(...data.map((d) => d.Time));
      const newTo = oldestTimestamp - 1;
      const newFrom = newTo - 30 * 24 * 60 * 60;
      fetchData(newFrom, newTo);
    }
  }, [data, fetchData]);

  return { data, isLoading, error, loadMore };
};

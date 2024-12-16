import { useMemo, useState } from "react";

import { API_PORTFOLIO_HISTORY } from "@/constants";
import useAuth from "@/features/auth/hooks/useAuth";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { historyRangeType, IPortoHistory } from "@/types";

const usePortoHistory = () => {
  const { isLoggedIn } = useAuth();

  const [selectedRange, setSelectedRange] = useState<historyRangeType>("1D");

  const { data, error, isLoading, mutate } = useCustomSWR<IPortoHistory[]>(
    isLoggedIn ? `${API_PORTFOLIO_HISTORY}?range=${selectedRange}` : null,
    "authenticated",
  );

  const handleRangeChange = (range: historyRangeType) => {
    setSelectedRange(range);
    mutate();
  };

  const chartData = useMemo(() => {
    const ranges: Record<historyRangeType, IPortoHistory[]> = {
      "1D": [],
      "1W": [],
      "1M": [],
      ALL: [],
    };

    if (data) {
      ranges[selectedRange] = data;
    }

    return ranges;
  }, [data, selectedRange]);

  return {
    error,
    isLoading,
    chartData,
    selectedRange,
    handleRangeChange,
  };
};

export default usePortoHistory;

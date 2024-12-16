import React, { useEffect, useRef } from "react";

import { ColorType, createChart, CrosshairMode } from "lightweight-charts";

import { useInfiniteOHLCData } from "@/features/market/hooks/useInfiniteOHLCData";
import { ITokenDetails, ITokenOHLC } from "@/types";

interface MarketDetailChartProps {
  token: ITokenDetails;
}

const MarketDetailChart: React.FC<MarketDetailChartProps> = ({ token }) => {
  const tokenId = token.pairDetails.id;

  const colors = {
    background: "#0b0d14",
    candlePositive: "#31dbb1",
    candleNegative: "#fc4a71",
    text: "#b5b7da",
    crosshair: "#7970ea",
  };

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<any | null>(null);
  const candlestickSeriesRef = useRef<any | null>(null);

  const { data, isLoading, error } = useInfiniteOHLCData(tokenId, "15");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const removeExistingChart = () => {
      try {
        if (chartRef.current && typeof chartRef.current.remove === "function") {
          chartRef.current.remove();
        }
      } catch (error) {
        console.warn("Error removing existing chart:", error);
      }

      // Clear references
      chartRef.current = null;
      candlestickSeriesRef.current = null;
    };

    removeExistingChart();

    // Create new chart
    const chart = createChart(chartContainerRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: colors.background },
        textColor: colors.text,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.1)" },
        horzLines: { color: "rgba(255,255,255,0.1)" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: colors.crosshair,
          style: 1,
          width: 2,
          visible: true,
          labelVisible: true,
        },
        horzLine: {
          color: colors.crosshair,
          style: 1,
          width: 2,
          visible: true,
          labelVisible: true,
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 5,
        barSpacing: 5,
        minBarSpacing: 2,
      },
      rightPriceScale: {
        visible: true,
        borderColor: colors.text,
      },
    });

    // Create candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: colors.candlePositive,
      downColor: colors.candleNegative,
      borderVisible: false,
      wickUpColor: colors.candlePositive,
      wickDownColor: colors.candleNegative,
    });

    // Store references
    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;

    return () => {
      removeExistingChart();
    };
  }, [
    colors.background,
    colors.text,
    colors.crosshair,
    colors.candlePositive,
    colors.candleNegative,
  ]);

  // Process and set chart data when available
  useEffect(() => {
    if (data.length > 0 && candlestickSeriesRef.current) {
      const formattedData = data.map((item: ITokenOHLC) => ({
        time: item.Time,
        open: item.Open,
        high: item.High,
        low: item.Low,
        close: item.Close,
      }));

      candlestickSeriesRef.current.setData(formattedData);
    }
  }, [data]);

  return (
    <>
      <div
        ref={chartContainerRef}
        id="chart-container"
        className="relative h-[600px] w-full overflow-hidden rounded-xl border border-borderColor"
      >
        {data.length === 0 && !isLoading && !error && (
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform text-textSecondary">
            Chart data not available
          </div>
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          Loading chart...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-error">
          Failed to load chart data
        </div>
      )}
    </>
  );
};

export default MarketDetailChart;

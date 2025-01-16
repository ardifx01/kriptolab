import React, { useCallback, useEffect, useRef } from "react";

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
    movingAverage50: "#9B59B6",
    movingAverage200: "#FFDC30",
  };

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<any | null>(null);
  const candlestickSeriesRef = useRef<any | null>(null);
  const ma50SeriesRef = useRef<any | null>(null);
  const ma200SeriesRef = useRef<any | null>(null);

  const { data, isLoading, error, lastUpdateTime } = useInfiniteOHLCData(
    tokenId,
    "15",
  );

  const calculateSMA = (data: ITokenOHLC[], period: number) => {
    const smaData = data.map((item, index) => {
      if (index < period - 1) {
        return null; // Return null for periods where we don't have enough data
      }

      const sum = data
        .slice(index - period + 1, index + 1)
        .reduce((acc, curr) => acc + curr.Close, 0);

      return {
        time: item.Time,
        value: sum / period,
      };
    });

    // Filter out null values
    return smaData.filter(
      (item): item is { time: number; value: number } => item !== null,
    );
  };

  const updateChart = useCallback(() => {
    if (data.length > 0 && candlestickSeriesRef.current) {
      const formattedData = data.map((item: ITokenOHLC) => ({
        time: item.Time,
        open: item.Open,
        high: item.High,
        low: item.Low,
        close: item.Close,
      }));

      const smaData50 = calculateSMA(data, 50);
      const smaData200 = calculateSMA(data, 200);

      // Update candlestick data
      if (chartRef.current?.timeScale().getVisibleLogicalRange() === null) {
        candlestickSeriesRef.current.setData(formattedData);
        ma50SeriesRef.current?.setData(smaData50);
        ma200SeriesRef.current?.setData(smaData200);
      } else {
        // Append only the most recent candle
        const lastCandle = formattedData[formattedData.length - 1];
        candlestickSeriesRef.current.update(lastCandle);

        // Only update MA if we have enough data points
        if (smaData50.length > 0) {
          const lastSMA = smaData50[smaData50.length - 1];
          ma50SeriesRef.current?.update(lastSMA);
        }
        if (smaData200.length > 0) {
          const lastSMA = smaData200[smaData200.length - 1];
          ma200SeriesRef.current?.update(lastSMA);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const removeExistingChart = () => {
      try {
        chartRef.current?.remove();
      } catch (error) {
        console.warn("Error removing existing chart:", error);
      }
      chartRef.current = null;
      candlestickSeriesRef.current = null;
      ma50SeriesRef.current = null;
      ma200SeriesRef.current = null;
    };

    removeExistingChart();

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
        borderColor: "rgba(255,255,255,0.1)",
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: colors.candlePositive,
      downColor: colors.candleNegative,
      borderVisible: false,
      wickUpColor: colors.candlePositive,
      wickDownColor: colors.candleNegative,
    });

    // Moving Average series
    const ma50Series = chart.addLineSeries({
      color: colors.movingAverage50,
      lineWidth: 1,
      priceLineVisible: false,
    });
    const ma200Series = chart.addLineSeries({
      color: colors.movingAverage200,
      lineWidth: 1,
      priceLineVisible: false,
    });

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;
    ma50SeriesRef.current = ma50Series;
    ma200SeriesRef.current = ma200Series;

    return () => {
      removeExistingChart();
    };
  }, [
    colors.background,
    colors.text,
    colors.crosshair,
    colors.candlePositive,
    colors.candleNegative,
    colors.movingAverage50,
    colors.movingAverage200,
  ]);

  useEffect(() => {
    updateChart();
  }, [updateChart, lastUpdateTime]);

  return (
    <div className="relative">
      <div className="absolute left-4 top-4 z-10 flex items-center gap-4 bg-background/80 p-2 text-sm backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-textPrimary">
            {token.pairDetails.description}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-0.5 w-4"
            style={{ backgroundColor: colors.movingAverage50 }}
          />
          <span className="text-textSecondary">MA50</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-0.5 w-4"
            style={{ backgroundColor: colors.movingAverage200 }}
          />
          <span className="text-textSecondary">MA200</span>
        </div>
      </div>

      <div
        ref={chartContainerRef}
        id="chart-container"
        className="relative h-[450px] w-full overflow-hidden rounded-xl border border-borderColor md:h-[600px]"
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
    </div>
  );
};

export default MarketDetailChart;

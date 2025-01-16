import React, { useCallback, useEffect, useRef, useState } from "react";

import { ColorType, createChart, CrosshairMode } from "lightweight-charts";

import { useInfiniteOHLCData } from "@/features/market/hooks/useInfiniteOHLCData";
import { formatValue } from "@/lib/helpers";
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
    volumeUp: "rgba(49, 219, 177, 0.5)",
    volumeDown: "rgba(252, 74, 113, 0.5)",
  };

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<any | null>(null);
  const candlestickSeriesRef = useRef<any | null>(null);
  const volumeSeriesRef = useRef<any | null>(null);
  const ma50SeriesRef = useRef<any | null>(null);
  const ma200SeriesRef = useRef<any | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error, lastUpdateTime } = useInfiniteOHLCData(
    tokenId,
    "15",
  );

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<{
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  } | null>(null);

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

      const volumeData = data.map((item: ITokenOHLC) => ({
        time: item.Time,
        value: Number(item.Volume),
        color: item.Close >= item.Open ? colors.volumeUp : colors.volumeDown,
      }));

      const smaData50 = calculateSMA(data, 50);
      const smaData200 = calculateSMA(data, 200);

      // Update candlestick data
      if (chartRef.current?.timeScale().getVisibleLogicalRange() === null) {
        candlestickSeriesRef.current.setData(formattedData);
        volumeSeriesRef.current?.setData(volumeData);
        ma50SeriesRef.current?.setData(smaData50);
        ma200SeriesRef.current?.setData(smaData200);
      } else {
        // Append only the most recent candle
        const lastCandle = formattedData[formattedData.length - 1];
        candlestickSeriesRef.current.update(lastCandle);

        // Append only the most recent volume
        const lastVolume = volumeData[volumeData.length - 1];
        volumeSeriesRef.current?.update(lastVolume);

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
  }, [data, colors.volumeUp, colors.volumeDown]);

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
      volumeSeriesRef.current = null;
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

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: colors.candlePositive,
      downColor: colors.candleNegative,
      borderVisible: false,
      wickUpColor: colors.candlePositive,
      wickDownColor: colors.candleNegative,
    });

    // Add volume series with a separate price scale
    const volumeSeries = chart.addHistogramSeries({
      color: colors.volumeUp,
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "volume",
      priceLineVisible: false,
      lastValueVisible: false,
    });

    // Set the volume price scale to the bottom
    chart.priceScale("volume").applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    // Moving Average series
    const ma50Series = chart.addLineSeries({
      color: colors.movingAverage50,
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    const ma200Series = chart.addLineSeries({
      color: colors.movingAverage200,
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;
    volumeSeriesRef.current = volumeSeries;
    ma50SeriesRef.current = ma50Series;
    ma200SeriesRef.current = ma200Series;

    // Subscribe to crosshair movements
    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.y < 0
      ) {
        setTooltipVisible(false);
        return;
      }

      const candleData: any = param.seriesData.get(candlestickSeries);
      const volumeData: any = param.seriesData.get(volumeSeries);

      if (candleData && volumeData) {
        setTooltipData({
          time: new Date(candleData.time * 1000).toLocaleString(),
          open: candleData.open,
          high: candleData.high,
          low: candleData.low,
          close: candleData.close,
          volume: volumeData.value,
        });
        setTooltipVisible(true);

        // Update tooltip position
        setTooltipPosition({
          x: param.point.x,
          y: param.point.y,
        });
      } else {
        setTooltipVisible(false);
      }
    });

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
    colors.volumeUp,
    colors.volumeDown,
  ]);

  useEffect(() => {
    updateChart();
  }, [updateChart, lastUpdateTime]);

  const formattedTooltipData = {
    time: tooltipData?.time,
    open: tooltipData?.open ? formatValue(tooltipData.open) : "N/A",
    high: tooltipData?.high ? formatValue(tooltipData.high) : "N/A",
    low: tooltipData?.low ? formatValue(tooltipData.low) : "N/A",
    close: tooltipData?.close ? formatValue(tooltipData.close) : "N/A",
    volume: tooltipData?.volume ? formatValue(tooltipData.volume) : "N/A",
  };

  return (
    <div className="relative">
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

      {/* Tooltip */}
      {tooltipVisible && tooltipData && (
        <div
          ref={tooltipRef}
          className="absolute z-30 rounded-md border border-borderColor bg-background/90 p-2 text-xs text-textPrimary backdrop-blur"
          style={{
            left: tooltipPosition.x + 10, // Offset to avoid overlapping with the cursor
            top: tooltipPosition.y + 10, // Offset to avoid overlapping with the cursor
          }}
        >
          <div>Time: {tooltipData.time}</div>
          <div>Open: {formattedTooltipData.open}</div>
          <div>High: {formattedTooltipData.high}</div>
          <div>Low: {formattedTooltipData.low}</div>
          <div>Close: {formattedTooltipData.close}</div>
          <div>
            Volume: {formattedTooltipData.volume}{" "}
            {token.pairDetails.traded_currency_unit}
          </div>
        </div>
      )}

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
    </div>
  );
};

export default MarketDetailChart;

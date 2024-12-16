import BigNumber from "bignumber.js";

// Configure BigNumber
BigNumber.config({
  DECIMAL_PLACES: 8,
  ROUNDING_MODE: BigNumber.ROUND_HALF_UP,
  EXPONENTIAL_AT: [-15, 20],
});

export interface PriceChangeResult {
  value: number;
  percentage: number;
  isPositive: boolean;
  formatted: string;
  rawBigNumber: BigNumber; // Added for cases where you need the raw BigNumber
}

/**
 * Calculates the percentage change between two values using BigNumber.js
 */
export const calculatePercentageChange = (
  currentPrice: string | number,
  previousPrice: string | number,
): PriceChangeResult => {
  try {
    // Convert inputs to BigNumber
    const current = new BigNumber(currentPrice);
    const previous = new BigNumber(previousPrice);

    // Handle invalid inputs
    if (
      !current.isFinite() ||
      !previous.isFinite() ||
      previous.isZero() ||
      current.isNaN() ||
      previous.isNaN()
    ) {
      return {
        value: 0,
        percentage: 0,
        isPositive: false,
        formatted: "0.00%",
        rawBigNumber: new BigNumber(0),
      };
    }

    // Calculate change
    const change = current.minus(previous);
    const percentageChange = change.dividedBy(previous).multipliedBy(100);

    // Convert to number for return value (keeping BigNumber for internal calculations)
    const percentageNumber = percentageChange.toNumber();

    return {
      value: change.toNumber(),
      percentage: percentageNumber,
      isPositive: percentageChange.isGreaterThanOrEqualTo(0),
      formatted: `${percentageChange.isGreaterThanOrEqualTo(0) ? "+" : ""}${percentageChange.toFixed(2)}%`,
      rawBigNumber: percentageChange,
    };
  } catch (error) {
    console.error("Error calculating percentage change:", error);
    return {
      value: 0,
      percentage: 0,
      isPositive: false,
      formatted: "0.00%",
      rawBigNumber: new BigNumber(0),
    };
  }
};

export function formatDate(
  dateString: string,
  locale = "en-GB",
  unix?: boolean,
): string {
  let date = new Date(dateString);

  if (unix) {
    date = new Date(parseFloat(dateString) * 1000);
    return date
      .toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      })
      .replace(" at", "");
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export const formatVolume = (value: string) => {
  const numValue = parseFloat(value);
  if (numValue >= 1_000_000_000) {
    return `${(numValue / 1_000_000_000).toFixed(2)}B`;
  }
  if (numValue >= 1_000_000) {
    return `${(numValue / 1_000_000).toFixed(2)}M`;
  }
  if (numValue >= 1_000) {
    return `${(numValue / 1_000).toFixed(2)}K`;
  }
  return numValue.toFixed(2);
};

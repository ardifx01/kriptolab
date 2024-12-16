import { formatCurrency } from "@coingecko/cryptoformat";

export function formatCurrencyValue(
  amount: number,
  isoCode: string,
  symbol = false,
  locale = "en",
  raw = false,
  noDecimal = false,
  abbreviated = false,
) {
  // Call the existing formatCurrency function to get the formatted currency string
  const formattedCurrency = formatCurrency(
    amount,
    isoCode,
    locale,
    raw,
    noDecimal,
    abbreviated,
  );

  // Remove the currency symbol from the formatted string
  return symbol
    ? formattedCurrency
    : formattedCurrency.replace(/^[^\d]*(\d)/, "$1").replace(/\s+[^\d]+$/, "");
}

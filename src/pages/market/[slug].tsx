import React, { useCallback, useEffect, useMemo } from "react";

import { useRouter } from "next/router";

import Layout from "@/components/Layout/Layout";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";
import MarketDetailChart from "@/features/market/components/MarketDetail/MarketChart/MarketChart";
import MarketDetailInfo from "@/features/market/components/MarketDetail/MarketDetailInfo.tsx/MarketDetailInfo";
import MarketDetailTable from "@/features/market/components/MarketDetail/MarketDetailTable/MarketDetailTable";
import TradeAsset from "@/features/market/components/MarketDetail/TradeAsset/TradeAsset";
import useTokenData from "@/features/market/hooks/useTokenData";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { ITokenDetails } from "@/types";

const TokenDetailPage = () => {
  const { query, replace } = useRouter();
  const { getTokenById } = useTokenData();

  // TOKEN DETAILS
  const tokenDetails = useCallback((): ITokenDetails | undefined => {
    return getTokenById(`${query.slug}`);
  }, [getTokenById, query.slug]);

  const details = tokenDetails();

  useEffect(() => {
    if (query.slug && !details) {
      // TODO: CREATE NOT FOUND PAGE
      replace("/market");
    }
  }, [replace, details, query.slug]);

  // PAGE TITLE
  const pageTitle = useMemo(() => {
    if (!details) return "Loading...";

    return `
      ${details.priceDetails?.name || "Unknown Token"}
      ${formatCurrencyValue(
        parseFloat(details.priceDetails?.last || "0"),
        details.pairDetails?.base_currency?.toUpperCase() || "IDR",
      )}`;
  }, [details]);

  if (!details) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout title={pageTitle} fullWidth simple>
      <div className="flex flex-col gap-3 lg:flex-row">
        <section className="order-2 flex w-full flex-col gap-3 lg:order-1">
          <MarketDetailChart token={details} />
          <MarketDetailTable token={details} />
        </section>
        <section className="order-1 flex w-full flex-col gap-3 lg:order-2 lg:max-w-[450px]">
          <MarketDetailInfo token={details} />
          <TradeAsset token={details} />
        </section>
      </div>
    </Layout>
  );
};

export default TokenDetailPage;

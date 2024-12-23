import React, { useCallback, useMemo } from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import Layout from "@/components/Layout/Layout";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";
import MarketDetailChart from "@/features/market/components/MarketDetail/MarketChart/MarketChart";
import MarketDetailInfo from "@/features/market/components/MarketDetail/MarketDetailInfo.tsx/MarketDetailInfo";
import MarketDetailTable from "@/features/market/components/MarketDetail/MarketDetailTable/MarketDetailTable";
import TradeAsset from "@/features/market/components/MarketDetail/TradeAsset/TradeAsset";
import useTokenData from "@/features/market/hooks/useTokenData";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { getPairsService, getTokenDetailsService } from "@/lib/services";
import { ITokenDetails, ITokenPair } from "@/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getPairsService();
  const tokens: ITokenPair[] = res.data;

  const paths = tokens.map((token) => ({
    params: { token: token.ticker_id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let token: any;
  if (params) {
    token = params.token;
  }
  const res = await getTokenDetailsService(token);
  const tokenDetails = res.data;

  return {
    props: { staticData: tokenDetails },
  };
};

const TokenDetailPage = ({ staticData }: { staticData: ITokenDetails }) => {
  const { query } = useRouter();
  const { getTokenById } = useTokenData();

  // TOKEN DETAILS
  const getTokenDetails = useCallback((): ITokenDetails | undefined => {
    return getTokenById(`${query.token}`);
  }, [getTokenById, query.token]);

  const tokenDetails = getTokenDetails();

  // PAGE TITLE
  const pageTitle = useMemo(() => {
    if (!tokenDetails) return "Loading...";

    return `
      ${tokenDetails.priceDetails?.name || "Unknown Token"}
      ${formatCurrencyValue(
        parseFloat(tokenDetails.priceDetails?.last || "0"),
        tokenDetails.pairDetails?.base_currency?.toUpperCase() || "IDR",
      )}`;
  }, [tokenDetails]);

  if (!tokenDetails || !staticData) {
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
          <MarketDetailChart token={tokenDetails} />
          <MarketDetailTable token={tokenDetails} />
        </section>
        <section className="order-1 flex w-full flex-col gap-3 lg:order-2 lg:max-w-[450px]">
          <MarketDetailInfo token={tokenDetails} />
          <TradeAsset token={tokenDetails} />
        </section>
      </div>
    </Layout>
  );
};

export default TokenDetailPage;

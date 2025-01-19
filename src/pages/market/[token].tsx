import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CallBackProps, Step } from "react-joyride";

import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import GuideTour from "@/components/GuideTour/GuideTour";
import Layout from "@/components/Layout/Layout";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";
import MarketDetailChart from "@/features/market/components/MarketDetail/MarketChart/MarketChart";
import MarketDetailInfo from "@/features/market/components/MarketDetail/MarketDetailInfo.tsx/MarketDetailInfo";
import MarketDetailTable from "@/features/market/components/MarketDetail/MarketDetailTable/MarketDetailTable";
import TradeAsset from "@/features/market/components/MarketDetail/TradeAsset/TradeAsset";
import useTokenData from "@/features/market/hooks/useTokenData";
import useInteractiveGuide from "@/hooks/useInteractiveGuide";
import useWindowSize from "@/hooks/useWindowSize";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { scrollToTop } from "@/lib/helpers/scrollTop";
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
  const { t } = useTranslation("interactiveguide");
  const { tradingGuide, completeGuide, firstLoad } = useInteractiveGuide();
  const { isMobile } = useWindowSize();

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

  // STEPS
  const tradingSteps: Step[] = [
    {
      target: "body",
      content: t("tradingGuide.welcome"),
      placement: "center",
      disableBeacon: true,
    },
    {
      target: "#market-info",
      content: t("tradingGuide.marketInfo"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#trade-asset",
      content: t("tradingGuide.tradeAsset"),
      placement: "auto",
      disableScrolling: !isMobile,
    },
    {
      target: "#input-token",
      content: t("tradingGuide.inputToken"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#input-idr",
      content: t("tradingGuide.inputIDR"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#quick-add",
      content: t("tradingGuide.quickAdd"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#balance",
      content: t("tradingGuide.balance"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#chart-container",
      content: t("tradingGuide.chartContainer"),
      placement: "auto",
      disableScrolling: !isMobile,
    },
    {
      target: "#market-legend",
      content: t("tradingGuide.marketLegend"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#market-table",
      content: t("tradingGuide.marketTable"),
      placement: "auto",
    },
    {
      target: "body",
      content: t("tradingGuide.allSet"),
      placement: "center",
    },
  ];

  const guideTourCallback = (data: CallBackProps) => {
    if (data.action === "skip" || data.status === "finished") {
      completeGuide("tradingGuide", "desktop");
      completeGuide("tradingGuide", "mobile");
      scrollToTop(0);
    }
  };

  if (!tokenDetails || !staticData) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <>
      <GuideTour
        run={
          (!firstLoad && tradingGuide.desktop) ||
          (!firstLoad && tradingGuide.mobile)
        }
        steps={tradingSteps}
        callback={guideTourCallback}
      />

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
    </>
  );
};

export default TokenDetailPage;

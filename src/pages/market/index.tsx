import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Step } from "react-joyride";

import { TabPanel } from "@headlessui/react";

import GuideTour from "@/components/GuideTour/GuideTour";
import Layout from "@/components/Layout/Layout";
import TabCustom from "@/components/Tab/TabCustom";
import CryptoNews from "@/features/market/components/CryptoNews/CryptoNews";
import Marketplace from "@/features/market/components/Marketplace/Marketplace";
import TopCrypto from "@/features/market/components/TopCrypto/TopCrypto";
import useTokenData from "@/features/market/hooks/useTokenData";
import useWindowSize from "@/hooks/useWindowSize";

const MarketPage = () => {
  const { trendingCrypto, topGainers } = useTokenData();
  const { isTablet } = useWindowSize();
  const { t } = useTranslation();

  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [
    { title: "Trending", id: "tab-trending" },
    { title: "Gainers", id: "tab-gainers" },
    { title: t("News"), id: "tab-news" },
  ];

  // DESKTOP STEPS
  const desktopSteps: Step[] = [
    {
      target: "body",
      content: "Welcome to the Market page! Let's get started.",
      disableBeacon: true,
      placement: "center",
    },
    {
      target: "#trending",
      content: "Discover the top 5 trending coins.",
      disableScrolling: true,
      placement: "top",
    },
    {
      target: "#gainers",
      content: "Explore the top 5 gainers in the market.",
      disableScrolling: true,
      placement: "top",
    },
    {
      target: "#news",
      content: "Stay updated with the latest crypto news.",
      disableScrolling: true,
      placement: "top",
    },
    {
      target: "#marketplace",
      content:
        "You can see the list of available tokens and select one to start trading.",
      placement: "top",
    },
    {
      target: "#search-crypto",
      content: "Quickly search for tokens by name or symbol.",
      disableScrolling: true,
      placement: "bottom",
    },
    {
      target: "#filter-crypto",
      content: "Filter tokens: Trending, Gainers, Losers, Watchlist.",
      disableScrolling: true,
      placement: "bottom",
    },
    {
      target: "body",
      content: "You're all set! Start exploring now.",
      placement: "center",
      disableBeacon: true,
    },
  ];

  return (
    <>
      <GuideTour run={true} steps={desktopSteps} />
      <Layout title="Market">
        <h2 className="mb-4 ml-0.5 w-full text-2xl font-medium sm:text-3xl lg:hidden">
          {t("Explore Market")}
        </h2>
        {!isTablet ? (
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <TopCrypto
              id="trending"
              title={t("Trending Coins")}
              tokens={trendingCrypto.slice(0, 5)}
            />
            <TopCrypto
              id="gainers"
              title={t("Top Gainers")}
              tokens={topGainers.slice(0, 5)}
            />
            <CryptoNews id="news" />
          </div>
        ) : (
          <div className="hidden lg:block">
            <TabCustom
              className="overflow-hidden rounded-t-xl border border-b-0 border-borderColor"
              tabs={tabs.map((v) => v.title)}
              onChange={(i) => setTabIndex(i)}
              currentIndex={tabIndex}
            >
              <TabPanel>
                <TopCrypto
                  title="Trending Coins"
                  tokens={trendingCrypto.slice(0, 5)}
                />
              </TabPanel>
              <TabPanel>
                <TopCrypto
                  title="Top Gainers"
                  tokens={topGainers.slice(0, 5)}
                />
              </TabPanel>
              <TabPanel>
                <CryptoNews />
              </TabPanel>
            </TabCustom>
          </div>
        )}
        <Marketplace />
      </Layout>
    </>
  );
};

export default MarketPage;

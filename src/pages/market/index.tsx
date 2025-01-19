import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CallBackProps, Step } from "react-joyride";

import { TabPanel } from "@headlessui/react";

import GuideTour from "@/components/GuideTour/GuideTour";
import Layout from "@/components/Layout/Layout";
import TabCustom from "@/components/Tab/TabCustom";
import CryptoNews from "@/features/market/components/CryptoNews/CryptoNews";
import Marketplace from "@/features/market/components/Marketplace/Marketplace";
import TopCrypto from "@/features/market/components/TopCrypto/TopCrypto";
import useTokenData from "@/features/market/hooks/useTokenData";
import useInteractiveGuide from "@/hooks/useInteractiveGuide";
import useWindowSize from "@/hooks/useWindowSize";

const MarketPage = () => {
  const { trendingCrypto, topGainers } = useTokenData();
  const { isMobile, isTablet, width } = useWindowSize();
  const { t } = useTranslation("interactiveguide");
  const { firstLoad, marketGuide, completeGuide } = useInteractiveGuide();

  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [
    { title: "Trending", id: "tab-trending" },
    { title: "Gainers", id: "tab-gainers" },
    { title: "News", id: "tab-news" },
  ];

  // DESKTOP STEPS
  const desktopSteps: Step[] = [
    {
      target: "body",
      content: t("marketGuide.welcome"),
      disableBeacon: true,
      placement: "center",
    },
    {
      target: "#trending",
      content: t("marketGuide.trending"),
      disableScrolling: true,
      placement: "top",
    },
    {
      target: "#gainers",
      content: t("marketGuide.gainers"),
      disableScrolling: true,
      placement: "top",
    },
    {
      target: "#news",
      content: t("marketGuide.news"),
      disableScrolling: true,
      placement: "top",
    },
    {
      target: "#marketplace",
      content: t("marketGuide.marketplace"),
      placement: "top",
      disableScrolling: true,
    },
    {
      target: "#search-crypto",
      content: t("marketGuide.searchCrypto"),
      disableScrolling: true,
      placement: "bottom",
    },
    {
      target: "#filter-crypto",
      content: t("marketGuide.filterCrypto"),
      disableScrolling: true,
      placement: "bottom",
    },
    {
      target: "#token-star",
      content: t("marketGuide.tokenStar"),
      placement: "top",
      disableScrolling: true,
    },
    {
      target: "body",
      content: t("marketGuide.allSet"),
      placement: "center",
      disableBeacon: true,
    },
  ];

  // MOBILE STEPS
  const mobileSteps: Step[] = [
    {
      target: "body",
      content: t("marketGuide.welcome"),
      disableBeacon: true,
      placement: "center",
    },
    {
      target: "#marketplace",
      content: t("marketGuide.marketplace"),
      placement: "auto",
    },
    {
      target: "#Trending",
      content: t("marketGuide.filterTrending"),
      disableScrolling: true,
      placement: "auto",
    },
    {
      target: "#Gainers",
      content: t("marketGuide.filterGainers"),
      disableScrolling: true,
      placement: "auto",
    },
    {
      target: "#Losers",
      content: t("marketGuide.filterLosers"),
      disableScrolling: true,
      placement: "auto",
    },
    {
      target: "#token-star",
      content: t("marketGuide.tokenStar"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#Watchlist",
      content: t("marketGuide.watchlist"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#token-search",
      content: t("marketGuide.tokenSearch"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "body",
      content: t("marketGuide.allSet"),
      placement: "center",
      disableBeacon: true,
    },
  ];

  const callback = (data: CallBackProps) => {
    if (width > 1024 && width < 1280) {
      if (data.index === 1) {
        setTabIndex(0);
      } else if (data.index === 2) {
        setTabIndex(1);
      } else if (data.index === 3) {
        setTabIndex(2);
      }
    }

    if (data.action === "skip" || data.status === "finished") {
      completeGuide("marketGuide", isMobile ? "mobile" : "desktop");
    }
  };

  return (
    <>
      <GuideTour
        run={
          isMobile
            ? marketGuide.mobile && !firstLoad
            : !firstLoad && marketGuide.desktop
        }
        steps={isMobile ? mobileSteps : desktopSteps}
        callback={callback}
      />

      <Layout title="Market">
        <h2 className="mb-4 ml-0.5 w-full text-2xl font-medium sm:text-3xl lg:hidden">
          {t("Explore Market")}
        </h2>
        {!isTablet ? (
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <TopCrypto
              id="trending"
              title={t("Trending Coins", { ns: "general" })}
              tokens={trendingCrypto.slice(0, 5)}
            />
            <TopCrypto
              id="gainers"
              title={t("Top Gainers", { ns: "general" })}
              tokens={topGainers.slice(0, 5)}
            />
            <CryptoNews id="news" />
          </div>
        ) : (
          <div className="hidden lg:block">
            <TabCustom
              className="overflow-hidden rounded-t-xl border border-b-0 border-borderColor"
              tabs={tabs.map((v) => v.title.toLowerCase())}
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

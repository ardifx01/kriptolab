import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import classNames from "classnames";

import TabCustom from "@/components/Tab/TabCustom";
import useWindowSize from "@/hooks/useWindowSize";
import { ITokenDetails, MarketMenuType } from "@/types";

import useTokenData from "../../hooks/useTokenData";

import MarketTable from "./MarketTable";
import SearchBar from "./SearchBar";

const Marketplace = () => {
  const { t } = useTranslation();
  const {
    watchlistedTokens,
    trendingCrypto,
    topGainers,
    topLosers,
    isLoading,
    filteredTokens,
    searchToken,
  } = useTokenData();
  const { isMobile } = useWindowSize();

  const [selectedMenu, setSelectedMenu] = useState<MarketMenuType>("Trending");

  const marketData: { title: MarketMenuType; data: ITokenDetails[] }[] = [
    { title: "Trending", data: trendingCrypto },
    { title: "Gainers", data: topGainers },
    { title: "Losers", data: topLosers },
    { title: "Watchlist", data: watchlistedTokens },
  ];

  const currentMarketData =
    marketData.find((item) => item.title === selectedMenu)?.data || [];

  const currentIndex = marketData.findIndex((v) => v.title === selectedMenu);

  return (
    <div className="w-full lg:mt-8">
      {!isMobile && (
        <div
          className={classNames("flex w-full items-center gap-3 font-inter")}
        >
          {marketData.map((menu) => (
            <div
              key={menu.title}
              onClick={() => setSelectedMenu(menu.title)}
              className={classNames(
                "flex h-10 cursor-pointer items-center justify-center rounded-lg border-2 px-4 transition-all",
                selectedMenu === menu.title
                  ? "border-transparent bg-primaryAccent hover:brightness-110"
                  : "border-borderColor bg-cardBackground hover:brightness-125",
              )}
            >
              {t(menu.title)}
            </div>
          ))}
          <SearchBar />
        </div>
      )}

      {isMobile && (
        <div>
          <TabCustom
            className="overflow-hidden rounded-t-xl border border-b-0 border-borderColor"
            tabs={marketData.map((v) => v.title)}
            onChange={(i) => setSelectedMenu(marketData[i].title)}
            currentIndex={currentIndex}
          >
            <></>
          </TabCustom>
        </div>
      )}

      <MarketTable
        tokenList={filteredTokens(currentMarketData, searchToken)}
        isLoading={isLoading}
        className="lg:mt-5"
      />
    </div>
  );
};

export default Marketplace;

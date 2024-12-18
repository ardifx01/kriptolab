import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSwipeable } from "react-swipeable";

import classNames from "classnames";

import Layout from "@/components/Layout/Layout";
import CryptoNews from "@/features/market/components/CryptoNews/CryptoNews";
import Marketplace from "@/features/market/components/Marketplace/Marketplace";
import TopCrypto from "@/features/market/components/TopCrypto/TopCrypto";
import useTokenData from "@/features/market/hooks/useTokenData";
import useWindowSize from "@/hooks/useWindowSize";

const MarketPage = () => {
  const { trendingCrypto, topGainers } = useTokenData();
  const { isMobile } = useWindowSize();
  const { t } = useTranslation();

  const [layerIndex, setLayerIndex] = useState(0);

  const layers = [
    {
      title: "Trending Coins",
      component: (
        <TopCrypto
          title={t("Trending Coins")}
          tokens={trendingCrypto.slice(0, 5)}
        />
      ),
    },
    {
      title: "Top Gainers",
      component: (
        <TopCrypto title={t("Top Gainers")} tokens={topGainers.slice(0, 5)} />
      ),
    },
    {
      title: "Crypto News",
      component: <CryptoNews />,
    },
  ];

  const handleNext = () => {
    setLayerIndex((layerIndex + 1) % layers.length);
  };

  const handlePrev = () => {
    setLayerIndex((layerIndex - 1 + layers.length) % layers.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: isMobile ? handleNext : undefined,
    onSwipedRight: isMobile ? handlePrev : undefined,
    trackMouse: true,
  });

  return (
    <Layout title="Market">
      {!isMobile ? (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <TopCrypto
            title="Trending Coins"
            tokens={trendingCrypto.slice(0, 5)}
          />
          <TopCrypto title="Top Gainers" tokens={topGainers.slice(0, 5)} />
          <CryptoNews />
        </div>
      ) : (
        <div {...swipeHandlers} className="relative">
          {/* Current Layer Content */}
          <div className="transition-all duration-300 ease-in-out">
            {layers[layerIndex].component}
          </div>

          {/* Pagination Dots */}
          <div className="mt-5 flex items-center justify-center gap-x-[30px] md:hidden">
            {layers.map((_, id) => {
              const isActive = layerIndex === id;
              return (
                <div
                  key={id}
                  onClick={() => setLayerIndex(id)}
                  className={classNames(
                    "size-3 cursor-pointer rounded-full transition-colors",
                    {
                      "bg-primaryAccent": isActive,
                      "bg-secondaryAccent": !isActive,
                    },
                  )}
                />
              );
            })}
          </div>
        </div>
      )}
      <Marketplace />
    </Layout>
  );
};

export default MarketPage;

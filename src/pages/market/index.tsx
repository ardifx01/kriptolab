import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { TabPanel } from "@headlessui/react";

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

  const [layerIndex, setLayerIndex] = useState(0);

  const layers = [
    { title: "Trending" },
    { title: "Gainers" },
    { title: t("News") },
  ];

  return (
    <Layout title="Market">
      {!isTablet ? (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <TopCrypto
            title={t("Trending Coins")}
            tokens={trendingCrypto.slice(0, 5)}
          />
          <TopCrypto title={t("Top Gainers")} tokens={topGainers.slice(0, 5)} />
          <CryptoNews />
        </div>
      ) : (
        <div>
          <TabCustom
            className="overflow-hidden rounded-t-xl border border-b-0 border-borderColor"
            tabs={layers.map((v) => v.title)}
            onChange={(i) => setLayerIndex(i)}
            currentIndex={layerIndex}
          >
            <TabPanel>
              <TopCrypto
                title="Trending Coins"
                tokens={trendingCrypto.slice(0, 5)}
              />
            </TabPanel>
            <TabPanel>
              <TopCrypto title="Top Gainers" tokens={topGainers.slice(0, 5)} />
            </TabPanel>
            <TabPanel>
              <CryptoNews />
            </TabPanel>
          </TabCustom>
        </div>
      )}
      <Marketplace />
    </Layout>
  );
};

export default MarketPage;

// <div {...swipeHandlers} className="relative">
//   {/* Current Layer Content */}
//   <div className="transition-all duration-300 ease-in-out">
//     {layers[layerIndex].component}
//   </div>

//   {/* Pagination Dots */}
//   <div className="mt-5 flex items-center justify-center gap-x-[30px] md:hidden">
//     {layers.map((_, id) => {
//       const isActive = layerIndex === id;
//       return (
//         <div
//           key={id}
//           onClick={() => setLayerIndex(id)}
//           className={classNames(
//             "size-3 cursor-pointer rounded-full transition-colors",
//             {
//               "bg-primaryAccent": isActive,
//               "bg-secondaryAccent": !isActive,
//             },
//           )}
//         />
//       );
//     })}
//   </div>
// </div>

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import classNames from "classnames";

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

  return (
    <div className="mt-8 flex w-full flex-col gap-5">
      <div className={classNames("flex w-full items-center gap-3 font-inter")}>
        {/* DESKTOP */}
        {!isMobile &&
          marketData.map((menu) => (
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

        {/* MOBILE */}
        {isMobile && (
          <Menu>
            <MenuButton
              className={classNames(
                "flex h-10 items-center gap-1.5 rounded-lg border text-sm",
                "border-borderColor bg-cardBackground px-4 lg:border-2 lg:px-5",
              )}
            >
              {selectedMenu}
              <IoChevronDown />
            </MenuButton>
            <MenuItems
              anchor="bottom start"
              transition
              className={classNames(
                "mt-2 flex min-w-[150px] flex-col gap-3 rounded-lg p-4",
                "border border-borderColor bg-cardBackground text-sm",
                "origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",
              )}
            >
              {marketData.map((menu) => (
                <MenuItem
                  key={menu.title}
                  onClick={() => setSelectedMenu(menu.title)}
                  as={"div"}
                  className={"flex items-center justify-between gap-1"}
                >
                  {t(menu.title)}
                  {selectedMenu === menu.title && <FaCheck />}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        )}

        <SearchBar />
      </div>

      <MarketTable
        tokenList={filteredTokens(currentMarketData, searchToken)}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Marketplace;

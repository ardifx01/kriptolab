import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";

import classNames from "classnames";

import Drawer from "@/components/Drawer/Drawer";
import useTokenData from "@/features/market/hooks/useTokenData";
import useWindowSize from "@/hooks/useWindowSize";
import { calculatePercentageChange } from "@/lib/helpers";

import TokenItem from "./TokenItem";

const TokenSearchBar = () => {
  const { isMobile } = useWindowSize();
  const { trendingCrypto, filteredTokens } = useTokenData();

  const searchBarRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [searchKey, setSearchKey] = useState("");
  const [searchWidget, setSearchWidget] = useState(false);
  const [searchDrawer, setSearchDrawer] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "/") {
        event.preventDefault();
        if (searchBarRef.current) {
          searchBarRef.current.focus();
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchWidget(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchedTokens = useMemo(() => {
    if (searchKey === "") return trendingCrypto.slice(0, isMobile ? 15 : 5);

    return filteredTokens(trendingCrypto, searchKey).map((token) => {
      return {
        pairDetails: token.pairDetails,
        priceDetails: token.priceDetails,
        percentage: calculatePercentageChange(
          token.priceDetails?.last || 0,
          token.priceDetails?.price_24h || 0,
        ),
      };
    });
  }, [filteredTokens, isMobile, searchKey, trendingCrypto]);

  return (
    <>
      {!isMobile && (
        <div ref={searchContainerRef} className="relative">
          <div
            className={classNames(
              "flex h-10 w-[350px] items-center gap-2 border px-4 py-2 text-sm xl:w-[400px]",
              "border-borderColor font-sora text-textSecondary",
              !searchWidget && "rounded-3xl bg-borderColor/40",
              searchWidget && "rounded-t-[1.25rem] border-b-0 bg-background",
            )}
          >
            <LuSearch className="h-6 w-6" />
            <input
              ref={searchBarRef}
              type="text"
              className="h-full w-full border-none bg-transparent outline-none"
              placeholder="Search tokens"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onFocus={() => setSearchWidget(true)}
            />
            <div className="flex h-6 w-7 items-center justify-center rounded-[4px] bg-borderColor">
              /
            </div>
          </div>

          {searchWidget && (
            <div
              className={classNames(
                "absolute z-50 max-h-[300px] w-full overflow-y-auto rounded-b-[1.25rem] border border-t-0 pt-1",
                "border-borderColor bg-background",
              )}
            >
              {searchedTokens.slice(0, 15).map((token) => (
                <TokenItem key={token.pairDetails.id} token={token} />
              ))}

              {searchedTokens.length === 0 && (
                <div className="mr-1 flex items-center justify-center px-4 pb-5 text-sm text-textSecondary">
                  No token found
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {isMobile && (
        <Fragment>
          <LuSearch
            className="h-6 w-6 text-textSecondary"
            onClick={() => setSearchDrawer(true)}
          />
          <Drawer
            isOpen={searchDrawer}
            onClose={() => setSearchDrawer(false)}
            containerClassName="h-[80%]"
            className="space-y-2 px-1.5 py-4"
          >
            <div className="px-3">
              <div
                className={classNames(
                  "flex h-11 w-full items-center rounded-xl border p-2 text-sm",
                  "border-borderColor bg-background/40 font-sora text-textSecondary",
                )}
              >
                <input
                  ref={searchBarRef}
                  type="text"
                  className="w-full border-none bg-transparent px-2 outline-none"
                  placeholder="Search tokens"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  onFocus={() => setSearchWidget(true)}
                />
              </div>
            </div>
            <div>
              {searchedTokens.slice(0, 15).map((token) => (
                <TokenItem key={token.pairDetails.id} token={token} />
              ))}
            </div>
          </Drawer>
        </Fragment>
      )}
    </>
  );
};

export default TokenSearchBar;

import React from "react";
import { useTranslation } from "react-i18next";

import classNames from "classnames";

import Shimmer from "@/components/Loader/Shimmer";
import { API_NEWS } from "@/constants";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { INews } from "@/types";

import NewsItem from "./NewsItem";

const CryptoNews = ({ id }: { id?: string }) => {
  const { t } = useTranslation();
  const { data, isLoading } = useCustomSWR<INews[]>(
    API_NEWS,
    "unauthenticated",
    {
      refreshInterval: 1000 * 60 * 5,
    },
  );

  return (
    <div
      id={id}
      className={classNames(
        "flex w-full flex-col rounded-xl border border-borderColor bg-cardBackground/40 p-4 py-[19px] lg:max-h-[416px] lg:p-5",
        "rounded-t-none border-t-0 xl:rounded-t-xl xl:border-t",
      )}
    >
      <h3 className="hidden font-sora font-semibold lg:text-lg xl:block">
        {t("News")}
      </h3>
      <div className="flex h-full flex-col justify-between gap-4 pt-1 lg:gap-3">
        {data &&
          data.length > 0 &&
          !isLoading &&
          data
            .slice(0, 3)
            .map((news, index) => <NewsItem key={index} news={news} />)}
        {!data &&
          isLoading &&
          [0, 1, 2].map((d) => (
            <div key={d} className="flex gap-3">
              <Shimmer className="h-16 min-w-24 rounded-lg" />
              <div className="flex w-full flex-col justify-center gap-2">
                <Shimmer className="h-8 w-full rounded-lg" />
                <Shimmer className="h-5 w-full rounded-lg" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CryptoNews;

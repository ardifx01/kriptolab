import React from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";

import classNames from "classnames";

import Shimmer from "@/components/Loader/Shimmer";
import OpenExternalLink from "@/components/OpenExternalLink/OpenExternalLink";
import { API_NEWS, BACKEND_URL } from "@/constants";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { formatDate } from "@/lib/helpers";
import { INews } from "@/types";

const CryptoNews = () => {
  const { i18n, t } = useTranslation();
  const { data, isLoading } = useCustomSWR<INews[]>(
    API_NEWS,
    "unauthenticated",
    {
      refreshInterval: 1000 * 60 * 5,
    },
  );

  return (
    <div
      className={classNames(
        "flex w-full flex-col rounded-xl border border-borderColor bg-cardBackground/40 p-4 lg:max-h-[416px] lg:p-5",
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
          data.slice(0, 3).map((news, index) => (
            <OpenExternalLink
              key={index}
              className="group flex cursor-pointer gap-2"
              link={news.link}
            >
              <Image
                src={
                  news.image
                    ? `${BACKEND_URL}${news.image}`
                    : "/images/news-default.jpeg"
                }
                alt={news.title || "Crypto News"}
                width={100}
                height={66}
                className="h-full w-24 rounded-lg group-hover:brightness-110"
              />
              <div className="flex w-full flex-col gap-1">
                <h3 className="text max-h-10 overflow-hidden text-ellipsis text-sm group-hover:text-secondaryAccent lg:max-w-[270px]">
                  {news.title}
                </h3>

                <div className="flex flex-col text-xs text-gray-400 lg:flex-row lg:items-center lg:gap-[6px] lg:text-sm">
                  <p>{news.author}</p>
                  <div className="mt-0.5 hidden size-1 rounded-full bg-gray-400 lg:block"></div>
                  <p className="text-[11px] lg:text-sm">
                    {formatDate(
                      news.date || "",
                      i18n.language === "id" ? "id-ID" : "en-GB",
                    )}
                  </p>
                </div>
              </div>
            </OpenExternalLink>
          ))}
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

import React from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";

import { API_NEWS, BACKEND_URL } from "@/constants";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { formatDate } from "@/lib/helpers";
import openPage from "@/lib/helpers/openPage";
import { INews } from "@/types";

const NewsPanel = () => {
  const { i18n } = useTranslation();

  const { data } = useCustomSWR<INews[]>(API_NEWS, "unauthenticated", {
    refreshInterval: 1000 * 60 * 5,
  });

  return (
    <div className="p-4">
      <div className="flex h-full flex-col gap-4 pt-1 lg:grid lg:grid-cols-2 lg:gap-4 xxl:grid-cols-3">
        {data &&
          data.map((news, index) => (
            <div
              key={index}
              className="group flex cursor-pointer gap-2 rounded-lg hover:bg-cardBackground/50"
              onClick={(e) => openPage(e, news.link || "")}
            >
              <Image
                src={
                  news.image
                    ? `${BACKEND_URL}${news.image}`
                    : "/images/news-default.jpeg"
                }
                alt={news.title || "Crypto News"}
                width={200}
                height={200}
                className="h-fit w-24 rounded-lg group-hover:brightness-110 lg:w-[170px]"
              />
              <div className="flex w-full flex-col gap-1">
                <h3 className="text text-sm lg:text-base">{news.title}</h3>
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewsPanel;

import React from "react";
import { useTranslation } from "react-i18next";

import { API_NEWS } from "@/constants";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { INews } from "@/types";

import NewsItem from "./NewsItem";

const LandingNews = () => {
  const { t } = useTranslation("landingpage");

  const { data, isLoading } = useCustomSWR<INews[]>(
    API_NEWS,
    "unauthenticated",
    {
      refreshInterval: 1000 * 60 * 5,
    },
  );

  const news =
    data && data.length > 0 && !isLoading
      ? data.filter((d) => d.image).slice(0, 3)
      : [];

  return (
    <section className="mt-[60px] grid w-full rounded-xl bg-cardBackground px-6 py-5">
      <h2 className="text-2xl font-medium">{t("Latest News")}</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((news, index) => (
          <NewsItem key={index} news={news} />
        ))}
      </div>
    </section>
  );
};

export default LandingNews;

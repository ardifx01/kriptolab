import React from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";

import { API_NEWS, BACKEND_URL } from "@/constants";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { formatDate } from "@/lib/helpers";
import { INews } from "@/types";

const LandingNews = () => {
  const { i18n } = useTranslation();

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
      <h2 className="text-2xl font-medium">Berita Terkini</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((news, index) => (
          <a
            key={index}
            href={news.link}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-lg border-2 border-borderColor"
          >
            <div className="aspect-video w-full">
              <Image
                src={
                  news.image
                    ? `${BACKEND_URL}${news.image}`
                    : "/images/news-default.jpeg"
                }
                alt={news.title || "Crypto News"}
                width={450}
                height={150}
                className="h-full w-full rounded-t-lg object-cover group-hover:brightness-110"
              />
            </div>
            <div className="p-3">
              <p className="line-clamp-2 text-sm sm:text-base">{news.title}</p>
              <div className="mt-2 flex flex-col text-xs text-gray-400 sm:flex-row sm:items-center sm:gap-[6px]">
                <p>{news.author}</p>
                <div className="mt-0.5 hidden size-1 rounded-full bg-gray-400 sm:block"></div>
                <p className="text-[11px] sm:text-sm">
                  {formatDate(
                    news.date || "",
                    i18n.language === "id" ? "id-ID" : "en-GB",
                  )}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default LandingNews;

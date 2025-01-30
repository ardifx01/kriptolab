import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";

import { BACKEND_URL } from "@/constants";
import { formatDate } from "@/lib/helpers";
import { INews } from "@/types";

const NewsItem = ({ news }: { news: INews }) => {
  const { i18n } = useTranslation();

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [news.image]);

  return (
    <a
      href={news.link}
      target="_blank"
      rel="noreferrer"
      className="block w-full rounded-lg border-2 border-borderColor"
    >
      <div className="aspect-video w-full">
        <Image
          src={
            hasError || !news.image
              ? "/images/news-default.jpeg"
              : `${BACKEND_URL}${news.image}`
          }
          onError={() => setHasError(true)}
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
  );
};

export default NewsItem;

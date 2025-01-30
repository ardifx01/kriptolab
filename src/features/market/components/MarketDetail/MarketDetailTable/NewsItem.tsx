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
      className="group flex cursor-pointer gap-2 rounded-lg hover:bg-cardBackground/50"
      href={news.link}
      target="_blank"
      rel="noreferrer"
    >
      <Image
        src={
          hasError || !news.image
            ? "/images/news-default.jpeg"
            : `${BACKEND_URL}${news.image}`
        }
        onError={() => setHasError(true)}
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
    </a>
  );
};

export default NewsItem;

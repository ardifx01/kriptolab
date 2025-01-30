import { useEffect, useState } from "react";

import Image from "next/image";

import OpenExternalLink from "@/components/OpenExternalLink/OpenExternalLink";
import { BACKEND_URL } from "@/constants";
import { formatDate } from "@/lib/helpers";
import { INews } from "@/types";

const NewsItem = ({ news }: { news: INews }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [news.image]);

  return (
    <OpenExternalLink
      className="group flex cursor-pointer gap-2"
      link={news.link}
    >
      <Image
        src={
          hasError || !news.image
            ? "/images/news-default.jpeg"
            : `${BACKEND_URL}${news.image}`
        }
        onError={() => setHasError(true)}
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
            {formatDate(news.date || "", "id-ID")}
          </p>
        </div>
      </div>
    </OpenExternalLink>
  );
};

export default NewsItem;

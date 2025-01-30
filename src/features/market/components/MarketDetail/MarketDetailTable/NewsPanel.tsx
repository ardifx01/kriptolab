import React from "react";

import { API_NEWS } from "@/constants";
import { useCustomSWR } from "@/hooks/useCustomSWR";
import { INews } from "@/types";

import NewsItem from "./NewsItem";

const NewsPanel = () => {
  const { data } = useCustomSWR<INews[]>(API_NEWS, "unauthenticated", {
    refreshInterval: 1000 * 60 * 5,
  });

  return (
    <div className="p-4">
      <div className="flex h-full flex-col gap-4 pt-1 lg:grid lg:grid-cols-2 lg:gap-4 xxl:grid-cols-3">
        {data &&
          data.map((news, index) => <NewsItem key={index} news={news} />)}
      </div>
    </div>
  );
};

export default NewsPanel;

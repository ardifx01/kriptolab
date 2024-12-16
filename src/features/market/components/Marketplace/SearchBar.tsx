import React, { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";

import classNames from "classnames";

import useTokenData from "../../hooks/useTokenData";

const SearchBar = () => {
  const { searchToken, updateSearchToken } = useTokenData();

  const [expand, setExpand] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setExpand(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  useEffect(() => {
    return () => updateSearchToken("");
  }, [updateSearchToken]);

  return (
    <div
      onClick={handleExpand}
      className={classNames(
        "flex h-10 items-center rounded-lg border px-3 font-inter transition-all duration-300 lg:border-2",
        "cursor-text bg-cardBackground text-textSecondary",
        expand
          ? "w-44 border-primaryAccent lg:w-64"
          : "w-12 border-borderColor",
      )}
    >
      <LuSearch className="min-h-5 min-w-5" />
      <input
        ref={inputRef}
        type="text"
        className={classNames(
          "ml-2 h-full w-full bg-transparent transition-all duration-300 placeholder:text-sm placeholder:text-gray-500",
          "outline-none focus:outline-none focus:ring-0 lg:placeholder:text-base",
          expand ? "opacity-100" : "opacity-0",
        )}
        placeholder="Search tokens"
        value={searchToken}
        onChange={(v) => updateSearchToken(v.target.value)}
        onBlur={() => {
          if (!searchToken) setExpand(false);
        }}
      />
    </div>
  );
};

export default SearchBar;

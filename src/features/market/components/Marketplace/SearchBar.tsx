import React, { useEffect, useRef } from "react";
import { LuSearch } from "react-icons/lu";

import classNames from "classnames";

import useTokenData from "../../hooks/useTokenData";

const SearchBar = () => {
  const { searchToken, updateSearchToken } = useTokenData();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => updateSearchToken("");
  }, [updateSearchToken]);

  return (
    <div
      id="search-crypto"
      className={classNames(
        "hidden h-10 items-center rounded-lg border px-3 font-inter hover:border-primaryAccent/80 lg:flex lg:border-2",
        "w-44 cursor-text border-borderColor bg-cardBackground text-textSecondary lg:w-64",
        "focus-within:border-primaryAccent/80",
      )}
    >
      <LuSearch className="min-h-5 min-w-5" />
      <input
        ref={inputRef}
        type="text"
        className={classNames(
          "ml-2 h-full w-full bg-transparent placeholder:text-sm placeholder:text-gray-500",
          "outline-none focus:outline-none focus:ring-0 lg:placeholder:text-base",
        )}
        placeholder="Search tokens"
        value={searchToken}
        onChange={(v) => updateSearchToken(v.target.value)}
      />
    </div>
  );
};

export default SearchBar;

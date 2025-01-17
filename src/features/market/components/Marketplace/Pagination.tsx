import React from "react";
import { useTranslation } from "react-i18next";

import classNames from "classnames";

import Button from "@/components/Button/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslation();

  const getPageNumbers = () => {
    const pages = [];
    const maxPageLinks = 5;

    if (totalPages <= maxPageLinks + 2) {
      // Show all pages if total pages are small
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Add the first page
      pages.push(1);

      // Pages before and after the current page
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      if (startPage > 2) pages.push("...");

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2 md:gap-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {t("Previous")}
      </Button>
      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <Button
            className={classNames(
              "flex items-center justify-center sm:w-auto",
              currentPage !== page && "bg-transparent",
            )}
            variant={currentPage === page ? "primary" : "secondary"}
            key={index}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="flex items-center">
            {page}
          </span>
        ),
      )}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {t("Next")}
      </Button>
    </div>
  );
};

export default Pagination;

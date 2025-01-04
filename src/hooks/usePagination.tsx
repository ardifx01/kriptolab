import { useEffect, useState } from "react";

import useTokenData from "@/features/market/hooks/useTokenData";

interface PaginationProps<T> {
  itemsPerPage: number;
  data: T[];
}

const usePagination = <T,>({ itemsPerPage, data }: PaginationProps<T>) => {
  const { searchToken } = useTokenData();

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indices of the first and last items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (searchToken) {
      handlePageChange(1);
    }
  }, [searchToken]);

  return {
    currentItems,
    currentPage,
    totalPages,
    totalPagesArray,
    handlePageChange,
  };
};

export default usePagination;

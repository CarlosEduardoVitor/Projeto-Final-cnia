import { useState } from "react";

export function useDashboardPagination(totalPages: number, itemsPerPage = 5) {
  const [page, setPage] = useState(0);

  const nextPage = () => {
    if (page + 1 < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return {
    page,
    setPage,
    nextPage,
    prevPage,
    itemsPerPage
  };
}

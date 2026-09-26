import { styles as PaginationStyles } from "../../styles/Kitchen/Pagination";

type PaginationProps = {
  currentPage: number;
  totalOrders: number;
  ordersPerPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalOrders, ordersPerPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const pagesPerGroup = 5;

  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(
    startPage + pagesPerGroup - 1,
    totalPages
  );

  const pages: number[] = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePreviousGroup = () => {
    const previousPage = startPage - 1;

    if (previousPage >= 1) {
      onPageChange(previousPage);
    }
  };

  const handleNextGroup = () => {
    const nextPage = endPage + 1;

    if (nextPage <= totalPages) {
      onPageChange(nextPage);
    }
  };

  return (
    <div className={PaginationStyles.container}>
      <span className={PaginationStyles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>

      <div className={PaginationStyles.controls}>
        {startPage > 1 && (
          <button
            type="button"
            onClick={handlePreviousGroup}
            className={PaginationStyles.button}
            aria-label="Previous pages"
          >
            «
          </button>
        )}

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={
              currentPage === page
                ? PaginationStyles.activeButton
                : PaginationStyles.button
            }
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <button
            type="button"
            onClick={handleNextGroup}
            className={PaginationStyles.button}
            aria-label="Next pages"
          >
            »
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
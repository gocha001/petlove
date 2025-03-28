import css from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages = [];
    const getMaxVisiblePages = () => (window.innerWidth < 768 ? 2 : 3);
    let left;
    let right;
    const maxVisiblePages = getMaxVisiblePages();
    if (window.innerWidth > 767) {
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        if (currentPage === totalPages) {
          left = Math.max(1, currentPage - 2);
        } else {
          left = Math.max(1, currentPage - 1);
        }
        if (currentPage === 1) {
          right = Math.min(totalPages, 3);
        } else {
          right = Math.min(totalPages, currentPage + 1);
        }
        if (left > 1) pages.push("...");
        for (let i = left; i <= right; i++) pages.push(i);
        if (right < totalPages) pages.push("...");
      }
    } else {
      if (currentPage === totalPages) {
        if (currentPage > 2) pages.push("...");
        pages.push(currentPage - 1, currentPage);
      } else {
        if (currentPage > 1) pages.push("...");
        pages.push(currentPage, currentPage + 1);
        if (totalPages > 2 && currentPage < totalPages - 1) pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className={css.pagination}>
      <div className={css.paginationChevron}>
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          <svg
            className={css.paginationChevronIcon}
            fill="black"
            stroke="black"
          >
            <use href="/icons/symbol-defs.svg#icon-fi-rr-angle-small-left" />
          </svg>
          <svg
            className={css.paginationChevronIcon}
            fill="black"
            stroke="black"
          >
            <use href="/icons/symbol-defs.svg#icon-fi-rr-angle-small-left" />
          </svg>
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg
            className={css.paginationChevronIcon}
            fill="black"
            stroke="black"
          >
            <use href="/icons/symbol-defs.svg#icon-fi-rr-angle-small-left" />
          </svg>
        </button>
      </div>
      <div className={css.paginationBlock}>
        {generatePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={currentPage === page ? css.active : ""}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>
      <div className={css.paginationChevron}>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg fill="black" stroke="black">
            <use href="/icons/symbol-defs.svg#icon-fi-rr-angle-small-left" />
          </svg>
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <svg fill="black" stroke="black">
            <use href="/icons/symbol-defs.svg#icon-fi-rr-angle-small-left" />
          </svg>
          <svg fill="black" stroke="black">
            <use href="/icons/symbol-defs.svg#icon-fi-rr-angle-small-left" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;

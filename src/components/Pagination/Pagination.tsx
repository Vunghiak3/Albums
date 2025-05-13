import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const maxVisiblePages = 5;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const showDots = totalPages > maxVisiblePages + 2;

    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(totalPages - 1, maxVisiblePages);
    }

    if (currentPage >= totalPages - 2) {
      start = Math.max(2, totalPages - maxVisiblePages + 1);
    }

    pageNumbers.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={currentPage === 1 ? styles.activePage : ""}
      >
        1
      </button>
    );

    if (showDots && start > 2) {
      pageNumbers.push(<span key="leftDots">...</span>);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? styles.activePage : ""}
        >
          {i}
        </button>
      );
    }

    if (showDots && end < totalPages - 1) {
      pageNumbers.push(<span key="rightDots">...</span>);
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={currentPage === totalPages ? styles.activePage : ""}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>

      <CustomDropdown
        value={pageSize}
        options={[10, 20, 50, 100]}
        onChange={onPageSizeChange}
      />
    </div>
  );
}

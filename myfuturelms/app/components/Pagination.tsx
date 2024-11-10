import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface IProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<IProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ul className="flex space-x-5 justify-center font-[sans-serif] mt-8 mb-8">
      <li
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        className="flex items-center justify-center shrink-0 hover:bg-gray-50 cursor-pointer w-9 h-9 rounded-md"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-gray-400" />
      </li>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <li
          key={page}
          onClick={() => handlePageClick(page)}
          className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold px-[13px] h-9 rounded-md ${
            page === currentPage
              ? "bg-purple-800 text-white"
              : "hover:bg-gray-50 text-gray-800"
          }`}
        >
          {page}
        </li>
      ))}
      <li
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        className="flex items-center justify-center shrink-0 hover:bg-gray-50 cursor-pointer w-9 h-9 rounded-md"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
      </li>
    </ul>
  );
};

export default Pagination;

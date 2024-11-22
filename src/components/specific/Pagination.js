import React from "react";

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 border ${
            currentPage === page
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-600 border-gray-300"
          } rounded hover:bg-blue-400 hover:text-white`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

import React, { useState } from "react";
import ProductList from "../specific/ProductList";
import Filters from "../specific/Filters";
import Pagination from "../specific/Pagination";

const ProductPage = () => {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 1000],
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Section */}
        <div className="w-full md:w-1/4">
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </div>
        {/* Product List Section */}
        <div className="w-full md:w-3/4">
          <ProductList filters={filters} currentPage={currentPage} />
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={10} // Mock value; replace with real pagination logic
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

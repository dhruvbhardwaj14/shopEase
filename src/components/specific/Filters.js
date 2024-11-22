import React, { useState } from "react";

const Filters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleCategoryChange = (e) => {
    setLocalFilters({ ...localFilters, category: e.target.value });
    onFilterChange({ ...localFilters, category: e.target.value });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.split("-");
    setLocalFilters({ ...localFilters, priceRange: value });
    onFilterChange({ ...localFilters, priceRange: value });
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Category</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={localFilters.category}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
        </select>
      </div>
      {/* Price Filter */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Price Range</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handlePriceChange}
        >
          <option value="0-1000">All</option>
          <option value="0-100">$0 - $100</option>
          <option value="100-500">$100 - $500</option>
          <option value="500-1000">$500 - $1000</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;

import React, { useState } from "react";

const Filters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    const updatedFilters = { ...localFilters, category: newCategory };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass the updated filters after state update
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
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Fashion</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Books">Books</option>
        </select>
      </div>
      {/* Price Filter */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Price Range</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handlePriceChange}
        >
          <option value="0-100000">All</option>
          <option value="0-1000">0 - 1000</option>
          <option value="1000-10000">1000 - 10000</option>
          <option value="10000-100000">10000 - 100000</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;

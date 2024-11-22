import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ filters, currentPage }) => {
  const mockProducts = [
    { id: 1, name: "Product 1", price: 100, category: "electronics" },
    { id: 2, name: "Product 2", price: 200, category: "fashion" },
    { id: 3, name: "Product 3", price: 300, category: "home" },
  ];

  // Apply filters (mock logic, replace with actual API filtering logic)
  const filteredProducts = mockProducts.filter(
    (product) =>
      (!filters.category || product.category === filters.category) &&
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

import React from "react";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const featuredProducts = [
    { id: 1, name: "Featured Product 1", price: 99.99, category: "fashion" },
    { id: 2, name: "Featured Product 2", price: 199.99, category: "electronics" },
    { id: 3, name: "Featured Product 3", price: 299.99, category: "home" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;

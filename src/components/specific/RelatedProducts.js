import React from "react";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ category }) => {
  const relatedProducts = [
    { id: 2, name: "Product 1", price: 149.99, category },
    { id: 3, name: "Product 2", price: 249.99, category },
    { id: 4, name: "Product 3", price: 99.99, category },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

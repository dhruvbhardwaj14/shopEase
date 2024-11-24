import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const RelatedProducts = ({ category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Fetch related products based on category
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3306/products", {
          params: { category }, // Sending category as query parameter
        });
        setRelatedProducts(response.data); // Set the fetched products
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (category) {
      fetchRelatedProducts();
    }
  }, [category]); // Re-fetch if category changes

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

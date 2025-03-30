import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = ({ filters, currentPage }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3306/products", {
          params: { category: filters.category }, // Pass category as query param
        });

        setProducts(
          response.data.filter((product) => {
            return (
              product.pprice >= parseInt(filters.priceRange[0]) &&
              product.pprice <= parseInt(filters.priceRange[1])
            );
          })
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.pid} product={product} />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;

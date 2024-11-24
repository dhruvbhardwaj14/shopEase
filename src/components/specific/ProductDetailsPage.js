import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";

const ProductDetailsPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // Store the fetched product data
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle error state
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3306/products/${id}`); // Call the API endpoint to fetch product by pid
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data); // Set the product data
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError(err.message); // Set error message in case of failure
        setLoading(false); // Set loading to false after error occurs
      }
    };

    fetchProduct(); // Fetch product when component mounts
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an issue
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {product && <ProductDetails product={product} />}{" "}
      {/* Render the product details if available */}
      <div className="mt-10">
        <RelatedProducts category={product.pcategory} />{" "}
        {/* Related products based on the category */}
      </div>
    </div>
  );
};

export default ProductDetailsPage;

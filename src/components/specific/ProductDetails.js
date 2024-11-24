import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../specific/CartContext";
import { useUser } from "./UserContext";
const ProductDetails = ({ product }) => {
  const [imageSrc, setImageSrc] = useState("");
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { cid } = useUser();

  useEffect(() => {
    // Fetch the image from Unsplash API
    const fetchImage = async () => {
      try {
        const ACCESS_KEY = "V8FO5gocZA_MOFwq6xtAOWnr5OUkzFp3CnSxjBchQ1k"; // Replace with your actual Unsplash Access Key
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${product.pname}&per_page=1`,
          {
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );

        const data = await response.json();
        // Set the image source to the first result's regular URL
        if (data.results && data.results.length > 0) {
          setImageSrc(data.results[0].urls.regular);
        } else {
          // Fallback to placeholder if no image is found
          setImageSrc(`https://via.placeholder.com/150?text=${product.pname}`);
        }
      } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
        // Fallback to placeholder on error
        setImageSrc(`https://via.placeholder.com/150?text=${product.pname}`);
      }
    };

    fetchImage();
  }, [product.pname]);
  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Product Image */}
      <div className="w-full md:w-1/2">
        <img
          src={imageSrc}
          alt={product.pname}
          className="w-full h-auto object-cover rounded shadow"
        />
      </div>
      {/* Product Information */}
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {product.pname}
        </h1>
        <p className="text-xl text-blue-600 font-semibold mb-4">
          ${product.pprice}
        </p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        {cid ? (
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded shadow hover:bg-blue-600 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        ) : (
          <>
            <h1 className="text-3xl mb-6">Please Login First to Add to Cart</h1>
            <Link to="/login" className="hover:text-gray-400">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Fetch the image from Unsplash API
    const fetchImage = async () => {
      try {
        const ACCESS_KEY = "V8FO5gocZA_MOFwq6xtAOWnr5OUkzFp3CnSxjBchQ1k"; // Replace with your actual Unsplash Access Key
        const response = await fetch(
          `https://api.wwunsplash.com/search/photos?query=${product.pname}&per_page=1`,
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

  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition p-4">
      <img
        src={imageSrc}
        alt={product.pname}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.pname}</h3>
      <p className="text-gray-600">&#8377;{product.pprice}</p>
      <Link
        to={`/products/${product.pid}`}
        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;

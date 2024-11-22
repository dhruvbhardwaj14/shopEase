import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition p-4">
      <img
        src={`https://via.placeholder.com/150?text=${product.name}`}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Link
        to={`/products/${product.id}`}
        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;

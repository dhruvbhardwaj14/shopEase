import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../specific/CartContext";
import { useUser } from "./UserContext";
const ProductDetails = ({ product }) => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { cid } = useUser();

  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Product Image */}
      <div className="w-full md:w-1/2">
        {/* <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover rounded shadow"
        /> */}
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

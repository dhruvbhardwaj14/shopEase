import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../specific/CartContext";
const ProductDetails = ({ product }) => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const mockProduct = {
    id: parseInt(id),
    name: `Product ${id}`,
    price: 199.99,
    description: "This is an amazing product!",
    image: "https://via.placeholder.com/400x400?text=Product+Image",
    category: "electronics",
  };
  const handleAddToCart = () => {
    addToCart(mockProduct);
  };
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Product Image */}
      <div className="w-full md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover rounded shadow"
        />
      </div>
      {/* Product Information */}
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
        <p className="text-xl text-blue-600 font-semibold mb-4">${product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <button className="bg-blue-500 text-white py-3 px-6 rounded shadow hover:bg-blue-600 transition" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

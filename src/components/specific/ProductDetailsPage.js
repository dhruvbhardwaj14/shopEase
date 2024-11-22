import React from "react";
import { useParams } from "react-router-dom";
// import { CartContext } from "../specific/CartContext";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";

const ProductDetailsPage = () => {
  const { id } = useParams();
  // const { addToCart } = useContext(CartContext);

  const mockProduct = {
    id: parseInt(id),
    name: `Product ${id}`,
    price: 199.99,
    description: "This is an amazing product!",
    image: "https://via.placeholder.com/400x400?text=Product+Image",
    category: "electronics",
  };

  // const handleAddToCart = () => {
  //   addToCart(mockProduct);
  // };

  return (
    <div className="container mx-auto px-6 py-10">
      <ProductDetails product={mockProduct} />
      {/* <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white py-3 px-6 rounded shadow hover:bg-blue-600"
      >
        Add to Cart
      </button> */}
      <div className="mt-10">
        <RelatedProducts category={mockProduct.category} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;

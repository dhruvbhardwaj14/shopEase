import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { useUser } from "./UserContext"; // Import the useUser hook to get the cid
// Create Context
export const CartContext = createContext();
// Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { cid } = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!cid) {
      setLoading(false); // If there's no cid, don't attempt to fetch cart
      return;
    }

    // Fetch the cart data from the backend
    axios
      .get(`http://localhost:3306/cart/${cid}`)
      .then((response) => {
        console.log(response.data);
        setCart(response.data || []); // Set the fetched cart data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching cart from backend:", error);
        setLoading(false);
      });
  }, [cid]); // Dependency on cid to re-fetch when cid changes
  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.pid === product.pid);

      // Determine the new quantity
      const newQuantity = existingProduct ? existingProduct.cqty + 1 : 1;

      // Update the cart in the frontend
      const updatedCart = existingProduct
        ? prevCart.map((item) =>
            item.pid === product.pid ? { ...item, cqty: newQuantity } : item
          )
        : [...prevCart, { ...product, cqty: newQuantity }];

      // Update the cart in the backend
      axios
        .post("http://localhost:3306/cart", {
          cid: cid, // Replace with actual cid
          pid: product.pid,
          cqty: newQuantity,
        })
        .then((response) => {
          console.log("Cart updated successfully: ", response.data);
        })
        .catch((error) => {
          console.error("Error updating cart: ", error);
        });

      return updatedCart; // Return the updated cart to the state
    });
  };

  // Remove from Cart
  const removeFromCart = (productId, cid) => {
    // Assuming you have a way to get the current user's cid (customer id)
    // Replace this with the actual customer ID

    // Call the backend API to remove the product from the cart
    axios
      .delete(`http://localhost:3306/cart/${cid}/${productId}`)
      .then((response) => {
        // If the product is successfully removed from the cart on the server
        console.log(response.data.message);

        // Update the cart in the frontend state
        setCart((prevCart) =>
          prevCart.filter((item) => item.pid !== productId)
        );
      })
      .catch((error) => {
        // Handle any errors from the backend
        console.error(
          "Error removing product from cart:",
          error.response ? error.response.data : error.message
        );
      });
  };

  // Update Quantity
  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

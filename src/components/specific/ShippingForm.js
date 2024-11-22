import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../specific/CartContext"; // Import CartContext
import { OrderContext } from "../specific/OrderContext"; // Import OrderContext

const ShippingForm = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext); // Get cart from CartContext
  const { addOrder } = useContext(OrderContext); // Get addOrder from OrderContext

  // Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Local state for shipping details
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCompleteOrder = () => {
    // Prepare the order object
    const order = {
      id: Date.now().toString(), // Unique order ID
      total: totalAmount, // Total amount
      items: cart, // Cart items
      shippingDetails, // Shipping details
    };

    addOrder(order); // Add the order to OrderContext

    // Navigate to OrdersPage
    navigate("/orders");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCompleteOrder();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={shippingDetails.name}
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingDetails.address}
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingDetails.city}
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={shippingDetails.state}
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={shippingDetails.zip}
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingDetails.country}
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded shadow hover:bg-blue-600"
        >
          Complete Order
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;

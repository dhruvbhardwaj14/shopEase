import React from "react";
import { Link } from "react-router-dom";

const OrderSummary = ({ totalAmount }) => {
  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
      <div className="flex justify-between mb-4">
        <span className="text-gray-600">Subtotal</span>
        <span className="text-gray-800 font-semibold">${totalAmount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-gray-600">Shipping</span>
        <span className="text-gray-800 font-semibold">$0.00</span>
      </div>
      <div className="flex justify-between border-t pt-4">
        <span className="text-lg font-bold text-gray-800">Total</span>
        <span className="text-lg font-bold text-blue-600">${totalAmount.toFixed(2)}</span>
      </div>
      <Link
        to="/checkout"
        className="block bg-blue-500 text-white text-center py-3 mt-6 rounded hover:bg-blue-600 transition"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default OrderSummary;

import React from "react";

const FinalOrderSummary = ({ totalAmount }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Order Summary</h2>
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
    </div>
  );
};

export default FinalOrderSummary;

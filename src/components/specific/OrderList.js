// src/components/OrderList.js
import React from "react";

const OrderList = ({ orders, onOrderClick }) => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      <ul className="space-y-4">
        {orders.map((order, index) => (
          <li
            key={index}
            className="p-4 border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => onOrderClick(order)}
          >
            <p>
              <span className="font-semibold">Order ID:</span> {order.id}
            </p>
            <p>
              <span className="font-semibold">Total:</span> $
              {order.total.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;

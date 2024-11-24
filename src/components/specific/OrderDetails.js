// src/components/OrderDetails.js
import React from "react";

const OrderDetails = ({ order }) => {
  const isoDate = order.odate;
  const date = new Date(isoDate);

  // Format the date in a readable format
  const readableDate = date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      <p>
        <span className="font-semibold">Order ID:</span> {order.oid}
      </p>
      <p>
        <span className="font-semibold">Order Date:</span> {readableDate}
      </p>
      <p>
        <span className="font-semibold">Total:</span> &#8377;
        {order.oamt.toFixed(2)}
      </p>
      {/* <div className="mt-4">
        <h3 className="font-semibold">Items:</h3>
        <ul className="list-disc ml-5">
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default OrderDetails;

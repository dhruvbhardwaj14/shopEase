// src/pages/OrdersPage.js
import React, { useContext, useState } from "react";
import { OrderContext } from "../specific/OrderContext";
import OrderList from "../specific/OrderList";
import OrderDetails from "../specific/OrderDetails";

const OrdersPage = () => {
  const { orders } = useContext(OrderContext);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <div className="flex gap-6">
        <div className="w-1/3">
          <OrderList orders={orders} onOrderClick={handleOrderClick} />
        </div>
        <div className="flex-1">
          {selectedOrder ? (
            <OrderDetails order={selectedOrder} />
          ) : (
            <p>Select an order to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

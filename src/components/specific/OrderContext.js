// src/context/OrderContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { cid } = useUser();

  useEffect(() => {
    if (!cid) return; // Ensure cid is available before fetching
    axios
      .get(`http://localhost:3306/order/${cid}`)
      .then((response) => {
        setOrders(response.data); // Set fetched orders to state
      })
      .catch((error) => {
        console.error(
          "Error fetching orders:",
          error.response || error.message
        );
        setOrders([]); // Fallback to an empty array on error
      });
  }, [cid]);

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

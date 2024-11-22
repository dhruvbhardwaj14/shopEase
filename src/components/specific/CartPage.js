import React, { useContext } from "react";
import { CartContext } from "../specific/CartContext";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={(newQty) => updateQuantity(item.id, newQty)}
              onRemoveItem={() => removeFromCart(item.id)}
            />
          ))}
        </div>
        <OrderSummary totalAmount={totalAmount} />
      </div>
    </div>
  );
};

export default CartPage;

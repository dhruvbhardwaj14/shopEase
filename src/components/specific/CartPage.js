import React, { useContext } from "react";
import { CartContext } from "../specific/CartContext";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { useUser } from "./UserContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cid } = useUser();
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.pprice * item.cqty,
    0
  );

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
      {cid ? (
        cart[0] ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              {cart.map((item) => (
                <CartItem
                  key={item.pid}
                  item={item}
                  onUpdateQuantity={(newQty) =>
                    updateQuantity(item.pid, newQty)
                  }
                  onRemoveItem={() => removeFromCart(item.pid, cid)}
                />
              ))}
            </div>
            <OrderSummary totalAmount={totalAmount} />
          </div>
        ) : (
          <>
            <h1 className="text-3xl mb-6 text-red-600 font-bold bg-red-100 border border-red-500 rounded-md p-4">
              Your Cart is Empty. Start Adding Products!
            </h1>
            <Link to="/products" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              PRODUCTS
            </Link>
          </>
        )
      ) : (
        <>
          <h1 className="text-3xl mb-6 text-red-600 font-bold bg-red-100 border border-red-500 rounded-md p-4">
          Please Login First
        </h1>
          <Link to="/login" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;

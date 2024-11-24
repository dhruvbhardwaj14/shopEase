import React, { useContext } from "react";
import { CartContext } from "../specific/CartContext";
import ShippingForm from "../specific/ShippingForm";
import PaymentOptions from "../specific/PaymentOptions";
import FinalOrderSummary from "../specific/FinalOrderSummary";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.pprice * item.cqty,
    0
  );
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Shipping Form */}
        <div className="flex-1">
          <ShippingForm />
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow">
          <FinalOrderSummary totalAmount={totalAmount} />
          {/* Payment Options */}
          <PaymentOptions />
        </div>
      </div>
      <Link to="/cart" className="block text-blue-500 mt-4 hover:underline">
        Go back to Cart
      </Link>
    </div>
  );
};

export default CheckoutPage;

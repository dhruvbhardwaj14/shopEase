import React, { useState } from "react";

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold">Payment Method</h3>
      <div className="space-y-4 mt-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="credit-card"
            name="payment-method"
            value="credit-card"
            checked={paymentMethod === "credit-card"}
            onChange={handlePaymentChange}
            className="mr-2"
          />
          <label htmlFor="credit-card">Credit Card</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="paypal"
            name="payment-method"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={handlePaymentChange}
            className="mr-2"
          />
          <label htmlFor="paypal">PayPal</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="cash-on-delivery"
            name="payment-method"
            value="cash-on-delivery"
            checked={paymentMethod === "cash-on-delivery"}
            onChange={handlePaymentChange}
            className="mr-2"
          />
          <label htmlFor="cash-on-delivery">Cash on Delivery</label>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;

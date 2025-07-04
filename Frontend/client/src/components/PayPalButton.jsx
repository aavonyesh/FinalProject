// PayPalButton.jsx
import React, { useEffect, useRef } from "react";

const PayPalButton = ({ amount = 1, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    if (!window.paypal) return;

    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          onSuccess(details); // Müvəffəqiyyətli ödəniş zamanı parent komponentə xəbər ver
        },
        onError: (err) => {
          console.error("PayPal error:", err);
        },
      })
      .render(paypalRef.current);
  }, [amount, onSuccess]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;

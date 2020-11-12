import React, { useState, useEffect, useRef } from "react";

export default function PayPalCheckout(props) {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const paypal = useRef();

  useEffect(() => {
    // Grab paypal button and render it inside div with paypal ref
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "points",
                amount: {
                  currency_code: "EUR",
                  value: props.amount * 0.5,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          props.handleSuccess();
        },
        onError: async (err) => {
          setError(err);
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      {paid ? (
        <div>Payment successful, you just bought {props.amount} points!</div>
      ) : (
        <div ref={paypal}></div>
      )}
    </div>
  );
}

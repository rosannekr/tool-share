import React, { useState } from "react";
import PayPalCheckout from "./PayPalCheckout";

export default function PaymentDropdown(props) {
  const [amount, setAmount] = useState(10);
  const [checkout, setCheckout] = useState(false);
  const [paid, setPaid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setPaid(true);
    props.addPoints(amount);
  };

  const handleClose = () => {
    setCheckout(false);
    setPaid(false);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mr-4 relative z-10 focus:outline-none text-white hover:text-gray-400"
      >
        {props.points} <i className="fas fa-coins"></i>
        <i className="fas fa-caret-down ml-2"></i>
      </button>
      {isOpen && (
        <button
          className="fixed inset-0 h-full w-full cursor-default bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        ></button>
      )}
      {isOpen && (
        <div className="absolute right-0 w-64 p-3 mt-2 mr-3 rounded-lg shadow bg-white text-gray-900">
          <h5 className="font-semibold text-center mb-1">
            Add points to your account
          </h5>
          <div className="py-3 text-center">
            {checkout ? (
              <PayPalCheckout amount={amount} handleSuccess={handleSuccess} />
            ) : (
              <div className="pl-2">
                <div className="flex items-baseline">
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    className="mr-2"
                    type="radio"
                    id="inlineCheckbox1"
                    value="10"
                    name="amount"
                    checked={amount === "10"}
                  />
                  <label htmlFor="inlineCheckbox1">10 points (€5)</label>
                </div>
                <div className="flex items-baseline">
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    className="mr-2"
                    type="radio"
                    id="inlineCheckbox2"
                    value="20"
                    name="amount"
                    checked={amount === "20"}
                  />
                  <label htmlFor="inlineCheckbox2">20 points (€10)</label>
                </div>
                <div className="flex items-baseline">
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    className="mr-2"
                    type="radio"
                    id="inlineCheckbox3"
                    value="50"
                    name="amount"
                    checked={amount === "50"}
                  />
                  <label htmlFor="inlineCheckbox3">50 points (€25)</label>
                </div>
              </div>
            )}
          </div>
          <div className="">
            {paid ? (
              <button onClick={handleClose} className="btn btn-primary w-full">
                Close
              </button>
            ) : (
              <button
                onClick={() => setCheckout(!checkout)}
                className="btn btn-primary w-full"
              >
                {checkout ? <span>Go back</span> : <span>Buy</span>}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import PayPalCheckout from "./PayPalCheckout";

export default function PaymentPopUp(props) {
  const [amount, setAmount] = useState(10);
  const [checkout, setCheckout] = useState(false);
  const [paid, setPaid] = useState(false);

  const handleSuccess = () => {
    setPaid(true);
    props.addPoints(amount);
  };

  const handleClose = () => {
    setCheckout(false);
    setPaid(false);
  };

  return (
    <div className="modal fade" id="addPointsModal" tabIndex="-1">
      <div className="modal-dialog mt-5">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add points to your account
            </h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {checkout ? (
              <PayPalCheckout amount={amount} handleSuccess={handleSuccess} />
            ) : (
              <div>
                <h4>Choose amount:</h4>
                <div className="form-check">
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-check-input"
                    type="radio"
                    id="inlineCheckbox1"
                    value="10"
                    name="amount"
                    checked={amount === "10"}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    10 points (€5)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-check-input"
                    type="radio"
                    id="inlineCheckbox2"
                    value="20"
                    name="amount"
                    checked={amount === "20"}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    20 points (€10)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-check-input"
                    type="radio"
                    id="inlineCheckbox3"
                    value="50"
                    name="amount"
                    checked={amount === "50"}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox3">
                    50 points (€25)
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            {paid ? (
              <button
                onClick={handleClose}
                className="btn btn-primary w-100"
                data-dismiss="modal"
              >
                Close
              </button>
            ) : (
              <button
                onClick={() => setCheckout(!checkout)}
                className="btn btn-primary w-100"
              >
                {checkout ? <span>Go back</span> : <span>Buy</span>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "./Confirmation.css";

function Confirmation() {
  const bg = "/confirmation-background.jpg";

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="confirmation">
      <div className="confirmation__text__container">
        <p className="confirmation__text">Thank you for your order!!</p>
        <p className="confirmation__text">Your payment has been confirmed.</p>
        <p className="confirmation__text">
          Your order will ship in the next 1-2 business days
        </p>
      </div>
    </div>
  );
}

export default Confirmation;

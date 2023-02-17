import React from "react";
import { useSelector } from "react-redux";
import "./Confirmation.css";

function Confirmation() {
  const { customerName, total } = useSelector((state) => state.orderInfo);

  const bg = "/confirmation-background.jpg";

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="confirmation">
      <div className="confirmation__text__container">
        <p className="confirmation__text">{`Thank you for your order ${customerName}!`}</p>
        <p className="confirmation__text">{`We have confirmed payment for your total of $${total}`}</p>
        <p className="confirmation__text">
          Your order will ship in the next 1-2 business days
        </p>
      </div>
    </div>
  );
}

export default Confirmation;

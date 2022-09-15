import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Confirmation(props) {
  const { customerName, customerEmail, total } = useSelector(
    (state) => state.orderInfo
  );

  const bg = "/confirmation-background.jpg";

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "65vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ backgroundColor: "lightpink", padding: "10px" }}>
        <p
          style={{
            color: "dodgerblue",
            fontSize: "24px",
            fontFamily: "Special Elite, cursive",
          }}
        >{`Thank you for your order ${customerName}!`}</p>
        <p
          style={{
            color: "dodgerblue",
            fontSize: "24px",
            fontFamily: "Special Elite, cursive",
          }}
        >{`We have confirmed payment for your total of $${total}`}</p>
        <p
          style={{
            color: "dodgerblue",
            fontSize: "24px",
            fontFamily: "Special Elite, cursive",
          }}
        >
          Your order will ship in the next 1-2 business days
        </p>
      </div>
    </div>
  );
}

export default Confirmation;

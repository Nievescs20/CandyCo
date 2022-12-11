import React from "react";
import { useDispatch } from "react-redux";
import { removeItemThunk, changeCartQuantityThunk } from "../../store/cart";
import { Button } from "@material-ui/core";
import { AiFillCloseCircle } from "react-icons/ai";
import { Wrapper } from "./CartItem.styles";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (product, quantity) => {
    if (product.quantity === 1 && quantity < 0) {
      dispatch(removeItemThunk(product.productId));
    } else {
      dispatch(changeCartQuantityThunk(product, quantity));
    }
  };

  const handleDelete = (product) => {
    dispatch(removeItemThunk(product.productId));
  };

  return (
    <Wrapper>
      <div>
        <div>
          <h3 style={{ color: "purple", fontFamily: "Special Elite, cursive" }}>
            {item.productName}
          </h3>
          <div className="information" style={{ padding: "0px 50px" }}>
            <p>Price: ${item.price}</p>
            <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
          </div>
          <div
            className="mainContainer"
            style={{
              display: "flex",
            }}
          >
            <div
              className="button-img-container"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: "8",
              }}
            >
              <div
                className="button-count"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "25px 25px",
                }}
              >
                <Button
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => handleQuantityChange(item, -1)}
                >
                  -
                </Button>
                <p>Qty:{item.quantity}</p>
                <Button
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => handleQuantityChange(item, 1)}
                >
                  +
                </Button>
              </div>
              <img src={item.imageUrl} alt="item in cart" />
            </div>
            <div
              className="delete-container"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button onClick={() => handleDelete(item)}>
                <AiFillCloseCircle />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CartItem;

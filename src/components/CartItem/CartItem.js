import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartThunk, removeItemThunk } from "../../store/cart";
import { Button } from "@material-ui/core";
// import { CartItemType } from "../App";

import { Wrapper } from "./CartItem.styles";

// type Props = {
//   item: CartItemType;
//   addToCart: (clickedItem: CartItemType) => void;
//   removeFromCart: (id: number) => void;
// };

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (product, quantity) => {
    if (product.quantity === 1 && quantity < 0) {
      dispatch(removeItemThunk(item.id));
    } else {
      dispatch(addCartThunk(product, quantity));
    }
    // dispatch(addCartThunk(product, quantity));
  };

  return (
    <Wrapper>
      <div>
        <h3>{item.productName}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => handleQuantityChange(item, -1)}
          >
            -
          </Button>
          <p>{item.quantity}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => handleQuantityChange(item, 1)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.imageUrl} alt="item in cart" />
    </Wrapper>
  );
};

export default CartItem;

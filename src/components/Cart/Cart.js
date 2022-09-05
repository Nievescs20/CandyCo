import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartThunk } from "../../store/cart";
import { Button } from "@material-ui/core";
// import { CartItemType } from "../App";
import CartItem from "../CartItem/CartItem";

import { Wrapper } from "./Cart.styles";

// type Props = {
//   cartItems: CartItemType[];
//   addToCart: (clickedItem: CartItemType) => void;
//   removeFromCart: (id: number) => void;
// };

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.products) || [];
  // console.log("cart from cart.js", cart);

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  console.log("Cart from Cart.js", cart);

  const calculateTotal = (shoppingCart) =>
    shoppingCart.reduce(
      (acc, product) => acc + product.orderItems.totalPrice,
      0
    );

  return (
    <Wrapper>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> : null}
      {cart.map((item) => (
        <CartItem
          key={item.productName}
          item={item}
          // addToCart={addToCart}
          // removeFromCart={removeFromCart}
        />
      ))}
      {/* <h2>Total: ${calculateTotal(cart).toFixed(2)}</h2> */}
    </Wrapper>
  );
};

export default Cart;

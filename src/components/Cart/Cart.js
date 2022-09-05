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
  const tax = 1.0725;
  const shipping = 7.99;

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const calculateTotal = (shoppingCart) =>
    shoppingCart.reduce((acc, product) => acc + Number(product.totalPrice), 0);

  return (
    <Wrapper>
      <h2 style={{ textAlign: "center" }}>Your Cart</h2>
      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>No items in cart.</p>
      ) : null}
      {cart.map((item) => (
        <CartItem
          key={item.productName}
          item={item}
          // addToCart={addToCart}
          // removeFromCart={removeFromCart}
        />
      ))}
      <div
        style={{
          backgroundColor: "lightblue",
          position: "fixed",
          bottom: "5%",
          // display: "flex",
          padding: "2%",
          width: "460px",
          // justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2>Subtotal:</h2>
            <h2>Tax:</h2>
            <h2>Flat Rate Shipping:</h2>
            <h2>Total:</h2>
          </div>
          <div>
            <h2>${calculateTotal(cart).toFixed(2)}</h2>
            <h2>${(calculateTotal(cart) * 0.0725).toFixed(2)}</h2>
            <h2>${shipping}</h2>
            <h2>
              {cart.length
                ? `${(calculateTotal(cart) * tax + shipping).toFixed(2)}`
                : "$0.00"}
            </h2>
          </div>
        </div>
        <div>
          <button
            // type="submit"
            className={
              cart.length
                ? "mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                : "mt-10 w-full bg-gray-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white"
            }
            // className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={cart.length ? false : true}
            onClick={() => console.log("checkout!")}
          >
            Checkout
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;

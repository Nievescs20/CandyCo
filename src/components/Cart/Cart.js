import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCartThunk } from "../../store/cart";
import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";

const Cart = ({ setCartOpen }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.products) || [];
  const tax = 1.0725;

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const calculateTotal = (shoppingCart) =>
    shoppingCart.reduce((acc, product) => acc + Number(product.totalPrice), 0);

  return (
    <Wrapper>
      <h2
        style={{
          textAlign: "center",
          color: "white",
          fontFamily: "Special Elite, cursive",
        }}
      >
        Your Cart
      </h2>
      <div style={{ height: "60vh" }}>
        {cart.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "white",
              fontFamily: "Special Elite, cursive",
            }}
          >
            No items in cart.
          </p>
        ) : null}
        {cart.map((item) => (
          <CartItem key={item.productName} item={item} />
        ))}
      </div>
      <div
        style={{
          backgroundColor: "gray",
          position: "fixed",
          bottom: "5%",
          padding: "2%",
          width: "460px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "white", fontFamily: "Special Elite, cursive" }}>
            <h2>Subtotal:</h2>
            <h2>Tax:</h2>
            <h2>Total:</h2>
          </div>
          <div style={{ color: "white", fontFamily: "Special Elite, cursive" }}>
            <h2>${calculateTotal(cart).toFixed(2)}</h2>
            <h2>${(calculateTotal(cart) * 0.0725).toFixed(2)}</h2>
            <h2>
              {cart.length
                ? `$${(calculateTotal(cart) * tax).toFixed(2)}`
                : "$0.00"}
            </h2>
          </div>
        </div>
        <div>
          <Link to="/checkout">
            <button
              className={
                cart.length
                  ? "mt-10 w-full cart-btn border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  : "mt-10 w-full bg-gray-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white"
              }
              onClick={() => setCartOpen(false)}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;

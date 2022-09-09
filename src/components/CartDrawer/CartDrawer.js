import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Drawer } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Wrapper, StyledButton } from "./CartDrawer.styles";
import Routes from "../Routes";
import Cart from "../Cart/Cart";
import "./CartDrawer.styles";
import { getCartThunk } from "../../store/cart";
import Navbar from "../Navbar";
import Footer from "../Footer";

const CartDrawer = ({ setCartOpen, cartOpen }) => {
  const dispatch = useDispatch();
  // const [cartOpen, setCartOpen] = useState(false);
  const cart = useSelector((state) => state.cart.products);

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar setCartOpen={setCartOpen} />
      <Wrapper>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart setCartOpen={setCartOpen} />
        </Drawer>
        <Routes />
      </Wrapper>
      <Footer />
    </div>
  );
};

export default CartDrawer;

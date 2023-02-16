import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Drawer } from "@material-ui/core";
import { Wrapper } from "./Application.styles";
import Routes from "../Routes";
import Cart from "../Cart/Cart";
import "./Application.styles";
import { getCartThunk } from "../../store/cart";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Application = ({ setCartOpen, cartOpen }) => {
  const dispatch = useDispatch();

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

export default Application;

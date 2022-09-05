import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Badge, Drawer } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Wrapper, StyledButton } from "./CartDrawer.styles";
import Routes from "../Routes";
import Cart from "../Cart/Cart";
import "./CartDrawer.styles";

const CartDrawer = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useSelector((state) => state.cart.products);
  console.log("Cart from CartDrawer.js", cart);

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart />
      </Drawer>

      <StyledButton
        onClick={() => setCartOpen(true)}
        style={{ backgroundColor: "dodgerblue" }}
      >
        <Badge badgeContent={cart.length} color="secondary">
          <AddShoppingCart />
        </Badge>
      </StyledButton>

      <Routes />
    </Wrapper>
  );
};

export default CartDrawer;

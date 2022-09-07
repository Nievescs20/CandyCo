import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { StyledButton } from "./CartDrawer/CartDrawer.styles";
import { logout } from "../store";
import Slide from "react-reveal/Slide";
import Flip from "react-reveal/Flip";

const Navbar = ({ setCartOpen }) => {
  const dispatch = useDispatch();
  // const [cartOpen, setCartOpen] = useState(false);
  const cart = useSelector((state) => state.cart.products);

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  const user = useSelector((state) => {
    return state.auth;
  });

  return (
    <div>
      <div
        style={{
          backgroundColor: "tomato",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>Get FREE standard shipping with any purchase of $50 or MORE!</div>
      </div>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <div style={{ flex: "2", display: "flex", justifyContent: "center" }}>
          <Flip bottom>
            <Link to="/home">
              <div className="">
                <img
                  style={{
                    height: "70px",
                    width: "157.5px",
                    marginRight: "20px",
                  }}
                  src="/CandyCo-background.png"
                  className=""
                  alt="Candy Co Logo"
                />
              </div>
            </Link>
          </Flip>
        </div>
        <Slide right>
          <div style={{ flex: "3" }}>
            {isLoggedIn ? (
              <div
                style={{
                  flex: "2",
                }}
              >
                {user.isAdmin ? (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ color: "lightgreen" }}>ALL PROFILES</div>
                    <div style={{ color: "dodgerblue" }}>USER PROFILES</div>
                  </div>
                ) : (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ color: "lightgreen" }}>SHOP</div>
                    <div style={{ color: "dodgerblue" }}>GIFTS</div>
                    <div style={{ color: "lightpink" }}>BULK CANDY</div>
                    <div style={{ color: "orange" }}>HALLOWEEN</div>
                    <div style={{ color: "gold" }}>SALE</div>
                    <div style={{ color: "lightcoral" }}>ABOUT</div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button style={{ color: "lightgreen" }}>SHOP</button>
                <button style={{ color: "dodgerblue" }}>GIFTS</button>
                <button style={{ color: "lightpink" }}>BULK CANDY</button>
                <button style={{ color: "orange" }}>HALLOWEEN</button>
                <button style={{ color: "gold" }}>SALE</button>
                <button style={{ color: "lightcoral" }}>ABOUT</button>
              </div>
            )}
          </div>
          <div
            style={{
              flex: "2",
            }}
          >
            {isLoggedIn ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <div style={{ margin: "10px" }}>
                  {`Weclome ${user.firstName
                    .slice(0, 1)
                    .toUpperCase()}${user.firstName.slice(1)}`}
                </div>
                <StyledButton
                  onClick={() => setCartOpen(true)}
                  style={{
                    padding: "15px",
                    backgroundColor: "#40e0d0",
                  }}
                >
                  <Badge badgeContent={cart.length} color="secondary">
                    <AddShoppingCart />
                  </Badge>
                </StyledButton>
                <div
                  onClick={() => dispatch(logout())}
                  style={{ margin: "10px" }}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <StyledButton
                  onClick={() => setCartOpen(true)}
                  style={{ padding: "15px", backgroundColor: "#40e0d0" }}
                >
                  <Badge badgeContent={cart.length} color="secondary">
                    <AddShoppingCart />
                  </Badge>
                </StyledButton>
                <div>
                  <Link to="/login">
                    <button
                      style={{
                        margin: "10px",
                        border: "1px solid hotpink",
                        borderRadius: "4px",
                        padding: "2px",
                      }}
                    >
                      Login / Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default Navbar;

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
          backgroundColor: "darkgreen",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "white" }}>
          Purchase Any Two Gift Baskets Of Value $50 Or More And Receive A Free
          CancyCo Tote!
        </div>
      </div>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
          backgroundColor: "black",
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
                  src="/CandyCo-background-white.png"
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
                    <Link to="/products">
                      <div style={{ color: "lightgreen" }}>ALL PRODUCTS</div>
                    </Link>
                    <Link to="/userprofiles">
                      <div style={{ color: "dodgerblue" }}>
                        All USER PROFILES
                      </div>
                    </Link>
                    <Link to="/profile">
                      <div style={{ color: "lightpink" }}>ADMIN PROFILE</div>
                    </Link>
                  </div>
                ) : (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link to="/products">
                      <button style={{ color: "lightgreen" }}>SHOP</button>
                    </Link>
                    <Link to="/gifts">
                      <button style={{ color: "dodgerblue" }}>GIFTS</button>
                    </Link>
                    <Link to="/bulkcandy">
                      <button style={{ color: "lightpink" }}>BULK CANDY</button>
                    </Link>
                    <Link to="/halloween">
                      <button style={{ color: "orange" }}>HALLOWEEN</button>
                    </Link>
                    <Link to="/sale">
                      <button style={{ color: "gold" }}>SALE</button>
                    </Link>
                    <button style={{ color: "lightcoral" }}>ABOUT</button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to="/products">
                  <button style={{ color: "lightgreen" }}>SHOP</button>
                </Link>
                <Link to="/gifts">
                  <button style={{ color: "dodgerblue" }}>GIFTS</button>
                </Link>
                <Link to="/bulkcandy">
                  <button style={{ color: "lightpink" }}>BULK CANDY</button>
                </Link>
                <Link to="/halloween">
                  <button style={{ color: "orange" }}>HALLOWEEN</button>
                </Link>
                <Link to="/sale">
                  <button style={{ color: "gold" }}>SALE</button>
                </Link>
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
                <Link to="/profile">
                  <div style={{ margin: "10px", color: "gold" }}>
                    {`Weclome ${user.firstName
                      .slice(0, 1)
                      .toUpperCase()}${user.firstName.slice(1)}`}
                  </div>
                </Link>
                <StyledButton
                  onClick={() => setCartOpen(true)}
                  style={{ padding: "15px", backgroundColor: "orange" }}
                >
                  <Badge badgeContent={cart.length} color="error">
                    <AddShoppingCart />
                  </Badge>
                </StyledButton>
                <button
                  onClick={() => dispatch(logout())}
                  style={{ margin: "10px", color: "hotpink" }}
                >
                  Logout
                </button>
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
                  style={{ padding: "15px", backgroundColor: "orange" }}
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
                        color: "hotpink",
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

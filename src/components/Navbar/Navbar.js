import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import Slide from "react-reveal/Slide";
import Flip from "react-reveal/Flip";
import { StyledButton } from "../Application/Application.styles";
import { logout } from "../../store";
import "./Navbar.css";

const Navbar = ({ setCartOpen }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products);

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  const user = useSelector((state) => {
    return state.auth;
  });

  return (
    <div>
      <div className="navbar__promotion__conatiner">
        <div className="navbar__promotion__text">
          Purchase Any Two Gift Baskets Of Value $50 Or More And Receive A Free
          CancyCo Tote!
        </div>
      </div>
      <div className="navbar__container">
        <div className="navbar__container__container">
          <Flip bottom>
            <Link to="/home">
              <div className="">
                <img
                  src="/CandyCo-background-white.png"
                  className="navbar__container__logo"
                  alt="Candy Co Logo"
                />
              </div>
            </Link>
          </Flip>
        </div>
        <Slide right>
          <div className="navbar__container__shopping-links">
            {isLoggedIn ? (
              <div
                style={{
                  flex: "2",
                }}
                q
              >
                {user.isAdmin ? (
                  <div className="navbar__shopping-links__arrangement">
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
                  <div className="navbar__shopping-links__arrangement">
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
              <div className="navbar__shopping-links__arrangement">
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
          <div className="navbar__cart-login__container">
            {isLoggedIn ? (
              <div className="navbar__cart-login__container__container">
                <Link to="/profile">
                  <div className="navbar__cart-login__user-name">
                    <div>
                      {`${user.firstName
                        .slice(0, 1)
                        .toUpperCase()}${user.firstName.slice(1)}`}
                    </div>
                    <div className="navbar__cart-login__user-name__svg__container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
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
                  className="navbar__cart-login__logout-button"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar__cart-login__container__container">
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
                    <button className="navbar__cart-login__logout-button">
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

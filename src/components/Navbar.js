import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { StyledButton } from "./CartDrawer/CartDrawer.styles";
import { logout } from "../store";

const Navbar = () => {
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useSelector((state) => state.cart.products);

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  const user = useSelector((state) => {
    return state.auth;
  });

  return (
    <nav className="flex items-center justify-between flex-wrap bg-orange-400 p-6 nav">
      <Link to="/home">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img
            style={{
              height: "70px",
              width: "157.5px",
              marginRight: "20px",
            }}
            src="/dbz-navbar-img.png"
            className="bg-orange-400"
            alt="Dragonball Z Fighters"
          />

          <span className="font-semibold text-2xl tracking-tight">
            DBZ Commerce
          </span>
        </div>
      </Link>
      {isLoggedIn ? (
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/products">
              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8 text-xl">
                Products
              </div>
            </Link>
            {user.role === "admin" ? (
              <>
                <Link to="userprofiles">
                  <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8 text-xl">
                    User Profiles
                  </div>
                </Link>
                <Link to="cart">
                  <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8 text-xl">
                    Test Cart
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="profile">
                  <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8 text-xl">
                    Profile
                  </div>
                </Link>
                <Link to="cart">
                  <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8 text-xl">
                    Your Bag
                  </div>
                </Link>
              </>
            )}
          </div>
          <div>
            <div className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-8 underline text-xl">
              {`Weclome ${user.firstName
                .slice(0, 1)
                .toUpperCase()}${user.firstName.slice(1)}`}
            </div>
            {/* <StyledButton onClick={() => setCartOpen(true)}>
              <Badge badgeContent={cart.length} color="secondary">
                <AddShoppingCart />
              </Badge>
            </StyledButton> */}
            <div
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-400 hover:bg-white mt-4 lg:mt-0"
              onClick={() => dispatch(logout())}
            >
              Logout
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/products">
              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8">
                Products
              </div>
            </Link>
            <Link to="cart">
              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8">
                Cart
              </div>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-400 hover:bg-white mt-4 lg:mt-0">
                Login
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Navbar = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  const { username, role } = useSelector((state) => {
    return state.auth;
  });

  return (
    <div id="navbar">
      <nav>
        {isLoggedIn ? (
          <div>
            {role === "admin" ? (
              <div>
                <div className="dropdown">
                  <button>{username}</button>
                  <div className="dropdown-content">
                    <div onClick={() => dispatch(logout())}>Logout</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="dropdown">
                <button>{username}</button>
                <div className="dropdown-content">
                  <button onClick={() => dispatch(logout())}>Logout</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div id="login">
            <Link to="/login">Login</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;

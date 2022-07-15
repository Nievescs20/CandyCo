import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../store";

const Login = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => {
    return state.auth;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formName = e.target.name;
    const username = e.target.username.value.toLowerCase();
    const password = e.target.password.value;
    dispatch(authenticate(username, password, formName));
  };

  return (
    <div id="logins">
      <form id="loginForm" onSubmit={handleSubmit} name="login">
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <p>
          Dont have an account? <Link to="/signup">Sign Up</Link>
        </p>
        {error && error.response && (
          <div style={{ color: "red" }}> {error.response.data} </div>
        )}
      </form>
    </div>
  );
};

export default Login;

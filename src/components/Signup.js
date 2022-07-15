import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticateSignUp } from "../store";

const Signup = () => {
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const { error } = useSelector((state) => {
    return state.auth;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formName = e.target.name;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (confirmPassword === password) {
      dispatch(authenticateSignUp(username, password, email, formName));
    }
    if (confirmPassword !== password) {
      setPasswordError("Passwords do not match");
    }
  };

  return (
    <div id="signups">
      <form id="signupForm" onSubmit={handleSubmit} name="signup">
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
          <label htmlFor="confirmPassword">
            <small>Confirm Password</small>
          </label>
          <input name="confirmPassword" type="password" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {error && error.response && (
          <div style={{ color: "red" }}> {error.response.data} </div>
        )}
        <div style={{ color: "red" }}>{passwordError}</div>
      </form>
    </div>
  );
};

export default Signup;

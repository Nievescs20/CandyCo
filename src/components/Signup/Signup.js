import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticateSignUp } from "../../store";
import "./Signup.css";

const Signup = () => {
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const bg = "/CandyCo-background.png";

  const { error } = useSelector((state) => {
    return state.auth;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formName = e.target.name;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (confirmPassword === password) {
      dispatch(
        authenticateSignUp(username, firstName, lastName, password, formName)
      );
    }
    if (confirmPassword !== password) {
      setPasswordError("Passwords do not match");
    }
  };

  return (
    <div
      id="signups"
      style={{ backgroundImage: `url(${bg})` }}
      className="signup"
    >
      <div className="signup__container">
        <form onSubmit={handleSubmit} name="signup" className="signup__form">
          <div className="my-2">
            <label htmlFor="username">
              <div className="signup__form__text">Email:</div>
            </label>
            <input
              name="username"
              type="text"
              required
              className="rounded text-blue-500 bg-gray-200"
            />
          </div>
          <div className="my-2">
            <label htmlFor="firstName">
              <div className="signup__form__text">First Name:</div>
            </label>
            <input
              name="firstName"
              type="text"
              required
              className="rounded text-blue-500 bg-gray-200"
            />
          </div>
          <div className="my-2">
            <label htmlFor="lastName">
              <div className="signup__form__text">Last Name:</div>
            </label>
            <input
              name="lastName"
              type="text"
              required
              className="rounded text-blue-500 bg-gray-200"
            />
          </div>
          <div className="my-2">
            <label htmlFor="password">
              <div className="signup__form__text">Password:</div>
            </label>
            <input
              name="password"
              type="password"
              required
              className="rounded text-blue-500 bg-gray-200"
            />
          </div>
          <div className="my-2">
            <label htmlFor="confirmPassword">
              <div className="signup__form__text">Confirm Password:</div>
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              className="rounded text-blue-500 bg-gray-200"
            />
          </div>

          <div>
            <button className=" text-green-300 py-1 px-4 signup__form__button">
              Sign Up
            </button>
          </div>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              {" "}
              <button className="underline py-1 px-3 rounded signup__form__login__button">
                Login
              </button>
            </Link>
          </p>
          {error && error.response && (
            <div className="signup__form__error"> {error.response.data} </div>
          )}
          <div
            className="signup__form__error
          "
          >
            {passwordError}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

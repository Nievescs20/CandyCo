import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticateSignUp } from "../store";

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
      style={{
        backgroundImage: `url(${bg})`,
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          opacity: "0.95",
          width: "40vw",
          border: "2px solid hotpink",
          borderRadius: "8px",
        }}
      >
        <form
          id="signupForm"
          onSubmit={handleSubmit}
          name="signup"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="my-2">
            <label htmlFor="username">
              <div style={{ color: "dodgerblue" }}>Email:</div>
            </label>
            <input
              name="username"
              type="text"
              className="rounded text-blue-500 bg-gray-200"
            />
          </div>
          <div className="my-2">
            <label htmlFor="firstName">
              <div style={{ color: "dodgerblue" }}>First Name:</div>
            </label>
            <input
              name="firstName"
              type="text"
              className="rounded text-blue-500 bg-gray-200"
            />
          </div>
          <div className="my-2">
            <label htmlFor="lastName">
              <div style={{ color: "dodgerblue" }}>Last Name:</div>
            </label>
            <input
              name="lastName"
              type="text"
              className="rounded text-blue-500 bg-gray-200"
            />
          </div>
          <div className="my-2">
            <label htmlFor="password">
              <div style={{ color: "dodgerblue" }}>Password:</div>
            </label>
            <input
              name="password"
              type="password"
              className="rounded text-blue-500 bg-gray-200"
            />
          </div>
          <div className="my-2">
            <label htmlFor="confirmPassword">
              <div style={{ color: "dodgerblue" }}>Confirm Password:</div>
            </label>
            <input
              name="confirmPassword"
              type="password"
              className="rounded text-blue-500 bg-gray-200"
            />
          </div>

          <div>
            <button
              className=" text-green-300 py-1 px-4"
              style={{
                color: "dodgerblue",
                border: "1px solid hotpink",
                borderRadius: "4px",
              }}
            >
              Sign Up
            </button>
          </div>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              {" "}
              <button
                className="underline py-1 px-3 rounded"
                style={{ color: "lightblue" }}
              >
                Login
              </button>
            </Link>
          </p>
          {error && error.response && (
            <div style={{ color: "red" }}> {error.response.data} </div>
          )}
          <div style={{ color: "red" }}>{passwordError}</div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

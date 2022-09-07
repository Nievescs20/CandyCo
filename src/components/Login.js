import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../store";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch();
  // let location = useLocation();
  // let navigate = useNavigate();
  // let params = useParams();

  // console.log("location", location);
  // console.log("navigate", navigate);
  // console.log("params", params);

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
      <div
        style={{
          width: "40vw",
          border: "2px solid hotpink",
          borderRadius: "8px",
        }}
      >
        <form
          // className="loginForm flex flex-col justify-center align-middle"
          onSubmit={handleSubmit}
          name="login"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="my-2">
            <label htmlFor="username">
              <div style={{ color: "dodgerblue" }}>Username: </div>
            </label>
            <input
              className="rounded text-blue-500 bg-gray-200 "
              name="username"
              type="text"
            />
          </div>
          <div className="my-2">
            <label htmlFor="password">
              <div style={{ color: "dodgerblue" }}>Password: </div>
            </label>
            <input
              className="rounded text-blue-500 bg-gray-200"
              name="password"
              type="password"
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
              Login
            </button>
          </div>
          <p>
            Dont have an account?{" "}
            <Link className="underline underline-offset-4" to="/signup">
              <button
                className="underline py-1 px-3 rounded"
                style={{ color: "lightblue" }}
              >
                Sign Up
              </button>
            </Link>
          </p>
          {error && error.response && (
            <div style={{ color: "red" }}> {error.response.data} </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

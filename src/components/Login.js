import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../store";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch();
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();

  console.log("location", location);
  console.log("navigate", navigate);
  console.log("params", params);

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
      <form
        className="loginForm flex flex-col justify-center"
        onSubmit={handleSubmit}
        name="login"
      >
        <div className="my-2">
          <label htmlFor="username">
            <small>Username: </small>
          </label>
          <input
            className="rounded text-blue-500 bg-orange-200 "
            name="username"
            type="text"
          />
        </div>
        <div className="my-2">
          <label htmlFor="password">
            <small>Password: </small>
          </label>
          <input
            className="rounded text-blue-500 bg-orange-200"
            name="password"
            type="password"
          />
        </div>
        <div>
          <button className=" hover:bg-blue-200 text-black py-1 px-4 rounded border-2">
            Login
          </button>
        </div>
        <p>
          Dont have an account?{" "}
          <Link className="underline underline-offset-4" to="/signup">
            <button className="underline hover:bg-blue-200 text-black py-1 px-3 rounded">
              Sign Up
            </button>
          </Link>
        </p>
        {error && error.response && (
          <div style={{ color: "red" }}> {error.response.data} </div>
        )}
      </form>
    </div>
  );
};

export default Login;

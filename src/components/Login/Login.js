import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../../store";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => {
    return state.auth;
  });

  const bg = "/CandyCo-background.png";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formName = e.target.name;
    const username = e.target.username.value.toLowerCase();
    const password = e.target.password.value;
    dispatch(authenticate(username, password, formName));
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="login">
      <div className="login__container">
        <form onSubmit={handleSubmit} name="login" className="login__form ">
          <div className="my-2">
            <label htmlFor="username">
              <div className="login__form__text">Email: </div>
            </label>
            <input
              className="rounded text-blue-500 bg-gray-200 "
              name="username"
              type="text"
            />
          </div>
          <div className="my-2">
            <label htmlFor="password">
              <div className="login__form__text">Password: </div>
            </label>
            <input
              className="rounded text-blue-500 bg-gray-200"
              name="password"
              type="password"
            />
          </div>
          <div>
            <button className=" login__form__button py-1 px-4">Login</button>
          </div>
          <p>
            Dont have an account?{" "}
            <Link className="underline underline-offset-4" to="/signup">
              <button className="underline py-1 px-3 rounded login__form__signup__button">
                Sign Up
              </button>
            </Link>
          </p>
          {error && error.response && (
            <div className="login__form__error"> {error.response.data} </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

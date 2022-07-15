import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { username } = useSelector((state) => {
    return state.auth;
  });

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  return (
    <div>
      {isLoggedIn ? (
        <div id="home">
          <h3>Welcome, {username}</h3>
        </div>
      ) : (
        <div id="home">
          <h3>Welcome</h3>
        </div>
      )}
    </div>
  );
};

export default Home;

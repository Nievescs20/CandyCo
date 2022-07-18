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
          <h3 className="font-semibold text-2xl tracking-tight">
            Welcome {username}
          </h3>
        </div>
      ) : (
        <div id="home">
          <h3 className="font-semibold text-2xl tracking-tight">
            Welcome Guest
          </h3>
        </div>
      )}
    </div>
  );
};

export default Home;

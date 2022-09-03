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
    <div className="flex flex-col">
      <img
        src="https://i.ytimg.com/vi/03dhtuWST4I/maxresdefault.jpg"
        alt="scene-one"
        className="w-2/3 h-90 object-scale-down"
      />
      <img
        src="https://assets1.ignimgs.com/2018/12/05/dragonballsuperbroly-1280-1544038171875_160w.jpg?width=1280"
        alt="scene-two"
        className="w-2/3 h-1/6 self-end object-scale-down"
      />
      <img
        src="https://wallpaper.dog/large/20399512.jpg"
        alt="scene-three"
        className="w-2/3 h-1/6 object-scale-down"
      />
    </div>
  );
};

export default Home;

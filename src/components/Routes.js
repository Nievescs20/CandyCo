import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { me } from "../store";
import AllProducts from "./AllProducts";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import SingleProduct from "./SingleProduct";
import UserProfile from "./UserProfile";
import UserProfiles from "./UserProfiles";
import { getProductsThunk } from "../store/products";

const RoutesComponent = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  const user = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    dispatch(me());
    dispatch(getProductsThunk());
  }, []);

  return (
    <div className="h-fit w-full route">
      {isLoggedIn ? (
        <div>
          {user.isAdmin === true ? (
            <Routes>
              <Route path="/userprofiles" element={<UserProfiles />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          )}
        </div>
      ) : (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login name="hi" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      )}
    </div>
  );
};

export default RoutesComponent;

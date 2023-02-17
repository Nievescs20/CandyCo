import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { me } from "../store";
import AllProducts from "./AllProducts/AllProducts";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import SingleProduct from "./SingleProduct/SingleProduct";
import UserProfile from "./UserProfile/UserProfile";
import UserProfiles from "./UserProfiles/UserProfiles";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import Confirmation from "./Confirmation/Confirmation";
import BulkCandy from "./BulkCandy/BulkCandy";
import Gifts from "./Gifts/Gifts";
import HalloweenProducts from "./HalloweenProducts/HalloweenProducts";
import SaleProducts from "./SaleProducts/SaleProducts";
import UnderConstruction from "./UnderConstruction/UnderConstruction";

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
  }, []);

  return (
    <div className="h-fit w-full route">
      {isLoggedIn ? (
        <div>
          {user.isAdmin === true ? (
            <Routes>
              <Route path="/userprofiles" element={<UserProfiles />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/bulkcandy" element={<BulkCandy />} />
              <Route path="/gifts" element={<Gifts />} />
              <Route path="/halloween" element={<HalloweenProducts />} />
              <Route path="/sale" element={<SaleProducts />} />
              <Route
                path="/underconstruction"
                element={<UnderConstruction />}
              />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/bulkcandy" element={<BulkCandy />} />
              <Route path="/gifts" element={<Gifts />} />
              <Route path="/halloween" element={<HalloweenProducts />} />
              <Route path="/sale" element={<SaleProducts />} />
              <Route
                path="/underconstruction"
                element={<UnderConstruction />}
              />
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/bulkcandy" element={<BulkCandy />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/halloween" element={<HalloweenProducts />} />
          <Route path="/sale" element={<SaleProducts />} />
          <Route path="/underconstruction" element={<UnderConstruction />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      )}
    </div>
  );
};

export default RoutesComponent;

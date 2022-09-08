import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserProfile(props) {
  const user = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  console.log("user", user);

  const bg = "/CandyCo-background.png";

  return (
    <div style={{ width: "100%", marginBottom: "25vh" }}>
      <div
        className="flex grow justify-center h-1/4 mt-32"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
          // backgroundPosition: "center",
        }}
      >
        <div
          className="bg-white shadow overflow-hidden sm:rounded-lg"
          style={{ border: "2px solid tomato", opacity: "0.9" }}
        >
          <div className="px-4 py-5 sm:px-6">
            <h3
              className="text-lg leading-6 font-medium"
              style={{ color: "navy" }}
            >
              User Details
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt
                  className="text-sm font-medium "
                  style={{ color: "dodgerblue" }}
                >
                  Email
                </dt>
                <dd
                  className="mt-1 text-sm  sm:mt-0 sm:col-span-2"
                  style={{ color: "tomato" }}
                >
                  {user.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt
                  className="text-sm font-medium "
                  style={{ color: "dodgerblue" }}
                >
                  User Name
                </dt>
                <dd
                  className="mt-1 text-sm  sm:mt-0 sm:col-span-2"
                  style={{ color: "tomato" }}
                >
                  {`${user.lastName}, ${user.firstName}`}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt
                  className="text-sm font-medium "
                  style={{ color: "dodgerblue" }}
                >
                  Account Type
                </dt>
                <dd
                  className="mt-1 text-sm  sm:mt-0 sm:col-span-2"
                  style={{ color: "tomato" }}
                >
                  {user.isAdmin ? "Admin" : "Customer"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

import React from "react";
import { useSelector } from "react-redux";
import "./UserProfile.css";

function UserProfile() {
  const user = useSelector((state) => state.auth);

  const bg = "/CandyCo-background.png";

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="user-profile ">
      <div className="flex grow justify-center h-1/4">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg user-profile__container">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium user-profile__table__header">
              User Details
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium user-profile__table__text">
                  Email
                </dt>
                <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 user-profile__table__text-red">
                  {user.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium user-profile__table__text">
                  User Name
                </dt>
                <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 user-profile__table__text-red">
                  {`${user.lastName}, ${user.firstName}`}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium user-profile__table__text">
                  Account Type
                </dt>
                <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 user-profile__table__text-red">
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

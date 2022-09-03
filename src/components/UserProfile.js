import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserProfile(props) {
  const user = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  return (
    <div className="flex grow justify-center h-1/4 mt-32">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg border-2 border-orange-300">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            User Details
          </h3>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">User Name</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${user.lastName}, ${user.firstName}`}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Account Type</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.isAdmin ? "Admin" : "Customer"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

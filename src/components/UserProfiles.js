import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFromDb } from "../store/users";

function UserProfiles(props) {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersFromDb());
  }, []);

  console.log("users", users);

  return (
    <div className="overflow-x-auto relative flex justify-center mt-20 h-96 overflow-y-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 w-3/4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              User Name
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              Account Type
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length &&
            users.map((user) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={user.id}
              >
                <td className="py-4 px-6">{user.username}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserProfiles;

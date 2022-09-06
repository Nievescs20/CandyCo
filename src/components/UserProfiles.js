import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFromDb } from "../store/users";

function UserProfiles(props) {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersFromDb());
  }, []);

  return (
    <div className="overflow-x-auto relative flex justify-center mt-20 h-80 overflow-y-auto">
      <table className="w-full text-sm text-left text-white dark:text-white w-3/4">
        <thead className="text-xs text-orange-700 uppercase bg-blue-200 dark:bg-blue-400 dark:text-orange-700 sticky top-0">
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
                className="bg-white border-b dark:bg-orange-400 dark:border-gray-700"
                key={user.id}
              >
                <td className="py-4 px-6">{`${user.lastName}, ${user.firstName}`}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">
                  {user.isAdmin ? "Admin" : "Customer"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserProfiles;

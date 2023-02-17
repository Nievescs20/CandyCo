import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFromDb } from "../../store/users";
import "./UserProfiles.css";

function UserProfiles() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersFromDb());
  }, []);

  const bg = "/CandyCo-background.png";

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="user-profiles">
      <div
        className="overflow-x-auto relative flex justify-center mt-20 h-80 overflow-y-auto"
        style={{ opacity: "0.95" }}
      >
        <table className="text-sm text-left text-white dark:text-white w-3/4">
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
              <th scope="col" className="py-3 px-6">
                Edit User
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map((user) => (
                <tr
                  className="bg-white border-b  dark:border-gray-700 user-profiles__table__row"
                  key={user.id}
                >
                  <td className="py-4 px-6">{`${user.lastName}, ${user.firstName}`}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">
                    {user.isAdmin ? "Admin" : "Customer"}
                  </td>
                  <td className="py-4 px-6">
                    <button className="user-profiles__table__button">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserProfiles;

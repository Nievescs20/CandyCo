import axios from "axios";

const TOKEN = "token";
//action types
const GET_USERS = "GET_USERS";

//action creators
const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

//thunk creators
export const getUsersFromDb = () => {
  return async function (dispatch) {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: users } = await axios.get("/api/users", {
        headers: {
          authorization: token,
        },
      });
      dispatch(getUsers(users));
    }
  };
};

let initialState = [];
//reducer
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
};

export default usersReducer;

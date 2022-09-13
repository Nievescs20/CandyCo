import axios from "axios";
import history from "../history";

const TOKEN = "token";

const SET_AUTH = "SET_AUTH";

const setAuth = (auth) => ({
  type: SET_AUTH,
  auth,
});

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const updateMe = (auth) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.put("/auth/me", auth, {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        username,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const authenticateSignUp =
  (username, firstName, lastName, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        username,
        firstName,
        lastName,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/home");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}

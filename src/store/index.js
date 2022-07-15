import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import users from "./users";
import auth from "./auth";
import products from "./products";
import singleProduct from "./singleProduct";

const reducer = combineReducers({
  users,
  auth,
  products,
  singleProduct,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";

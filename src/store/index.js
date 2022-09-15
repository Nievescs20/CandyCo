import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import users from "./users";
import auth from "./auth";
import products from "./products";
import singleProduct from "./singleProduct";
import cart from "./cart";
import customerInfo from "./customerInfo";
import orderInfo from "./successfulOrder";

const reducer = combineReducers({
  users,
  auth,
  products,
  singleProduct,
  cart,
  customerInfo,
  orderInfo,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";

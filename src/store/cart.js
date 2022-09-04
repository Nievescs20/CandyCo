import axios from "axios";

const UPDATE_CART = "UPDATE_CART";
const RESET_CART = "RESET_CART";
const GET_CART = "GET_CART";

export const updateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
});

export const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

export const resetCart = () => ({
  type: RESET_CART,
});

const getCartThunk = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");

      if (token) {
        const { data } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        dispatch(getCart(data));
      } else {
        const cart = JSON.parse(window.localStorage.getItem("cart"));
        dispatch(getCart(cart));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const addCartThunk = (product, quantity) => {
  return async (dispatch) => {};
};

const initialState = {};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;

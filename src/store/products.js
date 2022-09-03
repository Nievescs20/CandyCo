import axios from "axios";
import { randomThreeProducts } from "../utility/functions";

//action types
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_THREE_PRODUCTS = "GET_THREE_PRODUCTS";

//action creators
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  products,
});

const getThreeProducts = (products) => ({
  type: GET_THREE_PRODUCTS,
  products,
});

//thunk creators
export const getProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      dispatch(getProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getThreeProductsThunk = () => {
  return async (dispatch) => {
    const { data: products } = await axios.get("/api/products");
    const three = randomThreeProducts(products);
    dispatch(getThreeProducts(three));
  };
};

let initialState = { allProducts: [], threeProducts: [] };
//reducer
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, allProducts: action.products };
    case GET_THREE_PRODUCTS:
      return { ...state, threeProducts: action.products };
    default:
      return state;
  }
};

export default productsReducer;

import axios from "axios";
import { randomThreeProducts } from "../utility/functions";

//action types
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_THREE_PRODUCTS = "GET_THREE_PRODUCTS";
const GET_BULK_PRODUCTS = "GET_BULK_PRODUCTS";
const GET_GIFT_PRODUCTS = "GET_GIFT_PRODUCTS";
const GET_HALLOWEEN_PRODUCTS = "GET_HALLOWEEN_PRODUCTS";
const GET_SALE_PRODUCTS = "GET_SALE_PRODUCTS";

//action creators
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  products,
});

const getThreeProducts = (products) => ({
  type: GET_THREE_PRODUCTS,
  products,
});

const getBulkProducts = (products) => ({
  type: GET_BULK_PRODUCTS,
  products,
});

const getGiftProducts = (products) => ({
  type: GET_GIFT_PRODUCTS,
  products,
});

const getSaleProducts = (products) => ({
  type: GET_SALE_PRODUCTS,
  products,
});

const getHalloweenProducts = (products) => ({
  type: GET_HALLOWEEN_PRODUCTS,
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

export const getBulkProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products/bulk");
      dispatch(getBulkProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGiftProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products/gift");
      dispatch(getGiftProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getHalloweenProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products/halloween");
      dispatch(getHalloweenProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSaleProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products/sale");
      dispatch(getSaleProducts(products));
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

let initialState = {
  allProducts: [],
  threeProducts: [],
  bulkProducts: [],
  gifts: [],
  halloweenProducts: [],
  saleProducts: [],
};
//reducer
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, allProducts: action.products };
    case GET_THREE_PRODUCTS:
      return { ...state, threeProducts: action.products };
    case GET_BULK_PRODUCTS:
      return { ...state, bulkProducts: action.products };
    case GET_GIFT_PRODUCTS:
      return { ...state, gifts: action.products };
    case GET_HALLOWEEN_PRODUCTS:
      return { ...state, halloweenProducts: action.products };
    case GET_SALE_PRODUCTS:
      return { ...state, saleProducts: action.products };
    default:
      return state;
  }
};

export default productsReducer;

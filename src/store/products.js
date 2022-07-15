import axios from "axios";

//action types
const GET_PRODUCTS = "GET_PRODUCTS";

//action creators
const getProducts = (products) => ({
  type: GET_PRODUCTS,
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

let initialState = [];
//reducer
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export default productsReducer;

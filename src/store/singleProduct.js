import axios from "axios";

//action types
const GET_PRODUCT = "GET_PRODUCT";

//action creators
const getProduct = (product) => ({
  type: GET_PRODUCT,
  product,
});

//thunk creators
export const getProductThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`);
      dispatch(getProduct(product));
    } catch (error) {
      console.log(error);
    }
  };
};

let initialState = {};
//reducer
const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

export default singleProductReducer;

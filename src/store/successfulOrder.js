const SET_ORDER_INFO = "SET_ORDER_INFO";

const setOrderInfo = (info) => ({
  type: SET_ORDER_INFO,
  info,
});

export const setOrderInfoThunk = (info) => {
  return async (dispatch) => {
    dispatch(setOrderInfo(info));
  };
};

const initialData = {};

const orderInfoReducer = (state = initialData, action) => {
  switch (action.type) {
    case SET_ORDER_INFO:
      return action.info;

    default:
      return state;
  }
};

export default orderInfoReducer;

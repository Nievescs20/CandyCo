const SET_CUSTOMER_INFO = "SET_CUSTOMER_INFO";

const setCustomerInfo = (info) => ({
  type: SET_CUSTOMER_INFO,
  info,
});

export const setCustomerInfoThunk = (info) => {
  return async (dispatch) => {
    dispatch(setCustomerInfo(info));
  };
};

const initialData = {};

const customerInfoReducer = (state = initialData, action) => {
  switch (action.type) {
    case SET_CUSTOMER_INFO:
      return action.info;

    default:
      return state;
  }
};

export default customerInfoReducer;

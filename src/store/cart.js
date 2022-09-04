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

export const getCartThunk = () => {
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

export const addCartThunk = (product, quantity) => {
  return async (dispatch) => {
    const cost = product.price * quantity;
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        // logged in user
        const { data } = await axios.post(
          "/api/cart",
          {
            productId: product.id,
            totalQuantity: quantity,
            totalCost: cost,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(updateCart(data));
      } else {
        // for a guest or not signed in user
        let cart = JSON.parse(window.localStorage.getItem("cart"))
          ? JSON.parse(window.localStorage.getItem("cart"))
          : { products: [] };

        let newItem = true;
        if (cart.products) {
          for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].orderItems.productId === product.id) {
              newItem = false;
              break;
            }
          }
        }
        if (newItem) {
          cart.products.push({
            productName: product.productName,
            imageUrl: product.imageUrl,
            price: product.price,
            orderItems: {
              productId: product.id,
              totalQuantity: parseInt(quantity),
              totalCost: cost,
            },
          });
        }
        // if already in the cart, just updating quantity
        else {
          for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].orderItems.productId === product.id) {
              cart.products[i].orderItems.totalQuantity =
                cart.products[i].orderItems.totalQuantity + parseInt(quantity);
              cart.products[i].orderItems.totalCost =
                cart.products[i].orderItems.totalCost +
                parseInt(quantity) * cart.products[i].price;
            }
          }
        }

        window.localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(updateCart(cart));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case UPDATE_CART:
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;

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
        dispatch(getCart(cart.products));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addCartThunk = (product, quantity) => {
  return async (dispatch) => {
    const cost = product.price * quantity;
    console.log("product in thunk", product);
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        // logged in user
        const { data } = await axios.post(
          "/api/cart",
          {
            productId: product.productId,
            productName: product.productName,
            imageUrl: product.imageUrl,
            quantity: parseInt(quantity),
            price: product.price,
            totalPrice: cost,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        console.log("DB DATA", data);
        dispatch(updateCart(data));
      } else {
        // for a guest or not signed in user
        let cart = window.localStorage.getItem("cart")
          ? JSON.parse(window.localStorage.getItem("cart"))
          : { products: [] };

        let duplicateItem = false;
        if (cart.products) {
          for (let productItem of cart.products) {
            if (productItem.id === product.id) {
              duplicateItem = true;
              break;
            }
          }
        }

        if (!duplicateItem) {
          cart.products.push({
            id: product.id,
            description: product.description,
            fullDescription: product.fullDescription,
            productName: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: parseInt(quantity),
            totalPrice: cost,
          });
        }
        // if already in the cart, just updating quantity
        else {
          for (let productItem of cart.products) {
            if (productItem.id === product.id) {
              productItem.quantity += parseInt(quantity);
              productItem.totalPrice += parseInt(quantity) * productItem.price;
            }
          }
        }

        window.localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(updateCart(cart.products));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return { ...state, products: action.cart };
    case UPDATE_CART:
      return { ...state, products: action.cart };
    default:
      return state;
  }
};

export default cartReducer;

import axios from "axios";

const UPDATE_CART = "UPDATE_CART";
const RESET_CART = "RESET_CART";
const GET_CART = "GET_CART";
const REMOVE_ITEM = "REMOVE_ITEM";

export const updateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
});

export const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  id,
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

export const removeItemThunk = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        // logged in user
        await axios.post(
          "/api/cart/deleteItem",
          {
            productId: id,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(removeItem(id));
      } else {
        // for a guest or not signed in user
        let cart = JSON.parse(window.localStorage.getItem("cart"));
        const newCart = cart.products.filter((item) => {
          return item.id !== id;
        });
        cart = { ...cart, products: newCart };
        window.localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(updateCart(cart.products));
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
            productName: product.name,
            imageUrl: product.imageUrl,
            quantity: Number(quantity),
            price: product.price,
            totalPrice: cost,
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
            productName: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: Number(quantity),
            totalPrice: cost,
            productId: product.id,
          });
        }
        // if already in the cart, just updating quantity
        else {
          for (let productItem of cart.products) {
            if (productItem.id === product.id) {
              productItem.quantity += Number(quantity);
              productItem.totalPrice += Number(quantity) * productItem.price;
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

export const changeCartQuantityThunk = (product, quantity) => {
  return async (dispatch) => {
    const cost = product.price * quantity;
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        // logged in user
        const { data } = await axios.post(
          "/api/cart",
          {
            productId: product.productId,
            productName: product.name,
            imageUrl: product.imageUrl,
            quantity: Number(quantity),
            price: product.price,
            totalPrice: cost,
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
            // description: product.description,
            // fullDescription: product.fullDescription,
            productName: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: Number(quantity),
            totalPrice: cost,
            productId: product.id,
          });
        }
        // if already in the cart, just updating quantity
        else {
          for (let productItem of cart.products) {
            if (productItem.id === product.id) {
              productItem.quantity += Number(quantity);
              productItem.totalPrice += Number(quantity) * productItem.price;
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

export const closeOrderThunk = (orderInfo) => {
  console.log("close order thunk new", orderInfo);
  return async (dispatch) => {
    try {
      await axios.post("/api/cart/completeOrder", orderInfo);
      const token = window.localStorage.getItem("token");
      if (!token) {
        const cart = JSON.parse(window.localStorage.getItem("cart"));
        if (cart) {
          console.log("remove");
          window.localStorage.removeItem("cart");
        }
      }
      dispatch(resetCart());
    } catch (error) {
      console.log(error);
    }
  };
};

export const paymentThunk = (amount, token) => {
  return async (dispatch) => {
    try {
    } catch (error) {}
    const response = await axios.post("/api/payment", {
      token,
      product: { price: amount, name: "Candy Purchase" },
    });
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      console.log("Success! Check email for details");

      this.setState({ status: "Success! Check email for details" });
    } else {
      console.log("Something went wrong");

      this.setState({ status: "Something went wrong" });
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
    case REMOVE_ITEM:
      return {
        ...state,
        products: state.products.filter((item) => item.productId !== action.id),
      };
    case RESET_CART:
      return { products: [] };
    default:
      return state;
  }
};

export default cartReducer;

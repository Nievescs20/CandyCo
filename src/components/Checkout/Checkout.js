import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { getCartThunk, closeOrderThunk } from "../../store/cart";
import { setCustomerInfoThunk } from "../../store/customerInfo";
import { stripePub } from "../../../key";
import { setOrderInfoThunk } from "../../store/successfulOrder";
import "./Checkout.css";
import axios from "axios";

function Checkout() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.auth);
  const customerInfo = useSelector((state) => state.customerInfo);
  console.log("customer info", customerInfo);
  const [paymentStatus, setPaymentStatus] = useState();

  const tax = 1.0725;

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  //TODO: Future Plans to save order history to DB
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     setCustomerInfoThunk({
  //       name: e.target.name.value,
  //       email: e.target.email.value,
  //       street: e.target.street.value,
  //       city: e.target.city.value,
  //       country: e.target.country.value,
  //       zip: e.target.zip.value,
  //     })
  //   );
  // };

  const success = () => {
    console.log("success");
    dispatch(
      closeOrderThunk({
        customerId: user.id ? user.id : -1,
        orderNumber: cart[0].orderId ? cart[0].orderId : -1,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        total: calculatedTotal,
      })
    );
    dispatch(
      setOrderInfoThunk({
        customerId: user.id ? user.id : -1,
        orderNumber: cart[0].orderId ? cart[0].orderId : -1,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        total: calculatedTotal,
      })
    );
    // navigate("/confirmation");
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    dispatch(
      setCustomerInfoThunk({
        name: e.target.name.value,
        email: e.target.email.value,
        street: e.target.street.value,
        city: e.target.city.value,
        country: e.target.country.value,
        zip: e.target.zip.value,
      })
    );
    fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        success();
        let cart = JSON.parse(window.localStorage.getItem("cart"));
        console.log("cart", cart);
        if (cart.products.length > 0) {
          window.localStorage.setItem("cart", JSON.stringify({ products: [] }));
        }
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
    // console.log(e.target.name.value);
  };

  const calculateSubTotal = (shoppingCart) =>
    shoppingCart.reduce((acc, product) => acc + Number(product.totalPrice), 0);

  const calculatedTotal = (calculateSubTotal(cart) * tax).toFixed(2);

  const handleToken = async (token) => {
    const response = await axios.post("/api/payments", {
      token,
      product: { price: calculatedTotal, name: "Candy & Sweets" },
    });
    const { status } = response.data;
    if (status === "success") {
      console.log("Success! Check email for details");

      setPaymentStatus({ status: "Success! Check email for details" });
    } else {
      console.log("Something went wrong");

      setPaymentStatus({ status: "Something went wrong" });
    }
  };

  return (
    <div className="checkout__container">
      <div className="checkout__payment-info">
        <br />
        <div>
          <form
            className="max-w-xl m-4 p-10 bg-white rounded shadow-xl indent-2"
            // onSubmit={handleSubmit}
            onSubmit={handleCheckout}
          >
            {paymentStatus?.status ? (
              success()
            ) : (
              <p className="text-gray-800 font-medium">Shipping Information</p>
            )}
            <div className="">
              <label className="block text-sm text-gray-00" for="name">
                Name
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="name"
                type="text"
                required
                placeholder="Your Name"
                aria-label="Name"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" for="email">
                Email
              </label>
              <input
                className="w-full px-5  py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="email"
                type="text"
                required
                placeholder="Your Email"
                aria-label="Email"
              />
            </div>
            <div className="mt-2">
              <label className=" block text-sm text-gray-600" for="address">
                Address
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="street"
                type="text"
                required
                placeholder="Street"
                aria-label="Email"
              />
            </div>
            <div>
              <label className=" text-sm block text-gray-600" for="city">
                City
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="city"
                type="text"
                required
                placeholder="City"
                aria-label="Email"
              />
            </div>
            <div className="inline-block mt-2 w-1/2 pr-1">
              <label className=" block text-sm text-gray-600" for="country">
                Country
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="country"
                type="text"
                required
                placeholder="Country"
                aria-label="Email"
              />
            </div>
            <div
              className="inline-block mt-2 pl-1 w-1/2"
              style={{ marginLeft: "4px" }}
            >
              <label className=" block text-sm text-gray-600" for="zip">
                Zip
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="zip"
                type="text"
                required
                placeholder="Zip"
                aria-label="Email"
              />
            </div>

            <div className="checkout__payment__button__container">
              <button
                type="submit"
                className="checkout__payment__button"
                // onClick={handleCheckout}
              >
                Proceed To Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="checkout__order-info">
        <br />
        <div className="checkout__order-info__products-container">
          {cart.map((product) => (
            <div
              key={product.name}
              className="checkout__order-info__product-container"
            >
              <div className="checkout__order-info__product-image__container ">
                <img
                  src={product.imageUrl}
                  alt="Candy"
                  className="checkout__order-info__product-image"
                />
              </div>
              <div className="checkout__order-info__product-info__container">
                <div>{product.productName}</div>
                <div className="checkout__order-info__product__price__qty__container">
                  <div className="checkout__order-info__product__qty">
                    Qty: {product.quantity}
                  </div>
                  <div className="checkout__order-info__product__price">
                    ${Number(product.totalPrice).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout__order-info__total__container">
          <div>
            <div>Subtotal</div>
            <div>Tax</div>
            <div>Total</div>
          </div>
          <div className="checkout__order-info__total__right__container">
            <div>${calculateSubTotal(cart).toFixed(2)}</div>
            <div>{(calculateSubTotal(cart) * 0.0725).toFixed(2)}</div>
            <div>${calculatedTotal}</div>
          </div>
        </div>
        {/* <div style={{ textAlign: "center" }}>
          {customerInfo?.name ? (
            <StripeCheckout
              stripeKey={process.env.STRIPEPUB}
              token={handleToken}
              amount={calculatedTotal * 100}
              name="Payment"
              billingAddress
              shippingAddress
              style={{
                backgroundColor: "lightblue",
                border: "2px solid dodgerblue",
                width: "300px",
                borderRadius: "4px",
                padding: "10px",
              }}
            />
          ) : (
            <StripeCheckout
              disabled
              stripeKey={stripePub}
              token={handleToken}
              amount={calculatedTotal * 100}
              name="Payment"
              billingAddress
              shippingAddress
              style={{
                backgroundColor: "lightblue",
                border: "2px solid dodgerblue",
                width: "300px",
                borderRadius: "4px",
                padding: "10px",
              }}
            />
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Checkout;

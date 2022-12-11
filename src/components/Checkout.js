import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, closeOrderThunk } from "../store/cart";
import { setCustomerInfoThunk } from "../store/customerInfo";
import { useNavigate } from "react-router-dom";
import { stripePub } from "../../key";
import { setOrderInfoThunk } from "../store/successfulOrder";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function Checkout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.auth);
  const customerInfo = useSelector((state) => state.customerInfo);
  const [paymentStatus, setPaymentStatus] = useState();

  const tax = 1.0725;
  const shipping = 7.99;

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const handleSubmit = (e) => {
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
  };

  const calculateSubTotal = (shoppingCart) =>
    shoppingCart.reduce((acc, product) => acc + Number(product.totalPrice), 0);

  const calculatedTotal = (calculateSubTotal(cart) * tax + shipping).toFixed(2);

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

  const success = () => {
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
    navigate("/confirmation");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        minHeight: "65vh",
      }}
    >
      <div
        className="payment-info"
        style={{
          flex: 1,
          padding: "0px 30px 0px 30px",
        }}
      >
        <br />
        <div class="leading-loose">
          <form
            class="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
            onSubmit={handleSubmit}
          >
            {paymentStatus?.status ? (
              success()
            ) : (
              <p class="text-gray-800 font-medium">Shipping Information</p>
            )}
            {/* <p class="text-gray-800 font-medium">Shipping Information</p> */}
            <div class="">
              <label class="block text-sm text-gray-00" for="name">
                Name
              </label>
              <input
                class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="name"
                type="text"
                required
                placeholder="Your Name"
                aria-label="Name"
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="email">
                Email
              </label>
              <input
                class="w-full px-5  py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="email"
                type="text"
                required
                placeholder="Your Email"
                aria-label="Email"
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="address">
                Address
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="street"
                type="text"
                required
                placeholder="Street"
                aria-label="Email"
              />
            </div>
            <div style={{ margin: "5px, 0px, 5px, 0px" }}>
              <label class="hidden text-sm block text-gray-600" for="city">
                City
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="city"
                type="text"
                required
                placeholder="City"
                aria-label="Email"
              />
            </div>
            <div class="inline-block mt-2 w-1/2 pr-1">
              <label class="hidden block text-sm text-gray-600" for="country">
                Country
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="country"
                type="text"
                required
                placeholder="Country"
                aria-label="Email"
              />
            </div>
            <div
              class="inline-block mt-2 pl-1 w-1/2"
              style={{ marginLeft: "4px" }}
            >
              <label class="hidden block text-sm text-gray-600" for="zip">
                Zip
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="zip"
                type="text"
                required
                placeholder="Zip"
                aria-label="Email"
              />
            </div>

            <div class="mt-4">
              <button
                type="submit"
                style={{
                  backgroundColor: "lightblue",
                  border: "2px solid dodgerblue",
                  width: "300px",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              >
                Save Shipping Information
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="order-info"
        style={{
          flex: 1,
          padding: " 0px 30px 0px 30px",
          borderLeft: "2px solid black",
        }}
      >
        <br />
        <div style={{ marginTop: "30px" }}>
          {cart.map((product) => (
            <div
              key={product.name}
              className="product-container"
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid navy",
                borderRadius: "8px",
                padding: "10px",
                margin: "5px 0px 5px 0px",
              }}
            >
              <div className="image-container" style={{ width: "10%" }}>
                <img
                  src={product.imageUrl}
                  alt="Candy"
                  style={{ height: "50px", width: "50px" }}
                />
              </div>
              <div
                className="product-info-container"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%",
                }}
              >
                <div>{product.productName}</div>
                <div
                  style={{
                    display: "flex",
                    width: "30%",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ width: "30%" }}>Qty: {product.quantity}</div>
                  <div style={{ width: "50%", textAlign: "end" }}>
                    ${Number(product.totalPrice).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="total-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "40px 0px 40px 0px",
          }}
        >
          <div>
            <div>Subtotal</div>
            <div>Shipping</div>
            <div>Tax</div>
            <div>Total</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div>${calculateSubTotal(cart).toFixed(2)}</div>
            <div>${shipping}</div>
            <div>{(calculateSubTotal(cart) * 0.0725).toFixed(2)}</div>
            <div>${calculatedTotal}</div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
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
        </div>
      </div>
    </div>
  );
}

export default Checkout;

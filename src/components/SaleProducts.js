import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartThunk } from "../store/cart";
import toast, { Toaster } from "react-hot-toast";
import { getSaleProductsThunk } from "../store/products";

function SaleProducts(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.saleProducts);

  const notify = (product, quantity) =>
    toast(`${quantity} ${product.name} Added To Cart!`, {
      duration: 2000,
      position: "top-right",
      style: { backgroundColor: "dodgerblue" },
    });

  const handleAdd = (product, quantity) => {
    notify(product, quantity);
    dispatch(addCartThunk(product, quantity));
  };

  useEffect(() => {
    dispatch(getSaleProductsThunk());
  }, []);

  return (
    <div className="bg-white">
      <div style={{ width: "100%" }}>
        <img
          src="https://cdn.accentuate.io/92194897974/1637831962110/2022-Sale-Desktop--300-1.jpg?v=1649256567242"
          alt="falling candy"
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: "Special Elite, cursive",
            color: "green",
            padding: "30px",
            fontSize: "42px",
          }}
        >
          Whats Better Than Sweets For LESS!
        </div>
      </div>

      <div>
        <Toaster />
      </div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-32 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-32">
          {products.length > 0 &&
            products.map((product) => (
              <div style={{ margin: "50px 0px" }}>
                <Link to={`/products/${product.id}`} key={product.id}>
                  <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 m-30">
                    <img
                      src={product.imageUrl}
                      alt={product.description}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                </Link>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <b style={{ marginTop: "10px", fontSize: "18px" }}>
                    {product.name}
                  </b>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "5px",
                    }}
                  >
                    <b style={{ margin: "5px" }}>${product.price}</b>
                    <button
                      style={{
                        width: "150px",
                        backgroundColor: "purple",
                        border: "2px solid hotpink",
                        margin: "5px",
                        borderRadius: "6px",
                        color: "white",
                        padding: "3px",
                      }}
                      onClick={() => handleAdd(product, 1)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SaleProducts;

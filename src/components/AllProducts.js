import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartThunk } from "../store/cart";
import toast, { Toaster } from "react-hot-toast";
import Slide from "react-reveal/Slide";

function AllProducts(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);
  const [show, setShow] = useState(true);

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

  return (
    <div className="bg-white">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "125px",
        }}
      >
        <div
          style={{
            fontSize: "42px",
            fontFamily: "Special Elite, cursive",
            color: "orange",
          }}
        >
          WE'VE GOT CANDY FOR EVERYONE
        </div>
      </div>
      <Slide left opposite when={show}>
        <div style={{ width: "60%", margin: "auto auto" }}>
          <video
            width="100%"
            height="100%"
            autoplay="true"
            loop="true"
            muted="true"
            webkit-playsinline=""
            playsinline=""
            preload="none"
            className="shogun-image"
          >
            <source
              src="https://i.shgcdn.com/c3411ee3-e114-4757-a10e-f67655c79bf0/gif2video/-/format/webm/-/quality/lighter/"
              type="video/webm"
            />
            <source
              src="https://i.shgcdn.com/c3411ee3-e114-4757-a10e-f67655c79bf0/gif2video/-/format/mp4/-/quality/lighter/"
              type="video/mp4"
            />
          </video>
        </div>
      </Slide>

      <div>
        <Toaster />
      </div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {products.length > 0 &&
            products.map((product) => (
              <div>
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

export default AllProducts;

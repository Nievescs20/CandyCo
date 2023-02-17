import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartThunk } from "../../store/cart";
import toast, { Toaster } from "react-hot-toast";
import { getProductsThunk } from "../../store/products";
import Pagination from "../Pagination/Pagination";
import "./AllProducts.css";

function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentProducts = products.slice(indexOfFirstRecord, indexOfLastRecord);
  const numberOfPages = Math.ceil(products.length / recordsPerPage);

  const notify = (product, quantity) =>
    toast(`${quantity} ${product.name} Added To Cart!`, {
      duration: 2000,
      position: "bottom-right",
      style: { backgroundColor: "dodgerblue" },
    });

  const handleAdd = (product, quantity) => {
    notify(product, quantity);
    dispatch(addCartThunk(product, quantity));
  };

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  return (
    <div className="all-products">
      <div className="all-products__header__container">
        <div className="all-products__header__text">
          WE'VE GOT CANDY FOR EVERYONE
        </div>
      </div>
      <div className="all-products__video__container">
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

      <div>
        <Toaster />
      </div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 gap-x-32 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-40">
          {products.length > 0 &&
            currentProducts.map((product) => (
              <div className="all-products__product-container" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 m-30">
                    <img
                      src={product.imageUrl}
                      alt={product.description}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                </Link>
                <div className="all-products__product__text__container">
                  <b className="all-products__product__text-top">
                    {product.name}
                  </b>
                  <div className="all-products__product__text-bottom__container">
                    <b className="all-products__product__text-bottom__price">
                      ${product.price}
                    </b>
                    <button
                      className="all-products__product__text-bottom__button"
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
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default AllProducts;

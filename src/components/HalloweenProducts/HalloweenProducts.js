import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { addCartThunk } from "../../store/cart";
import { getHalloweenProductsThunk } from "../../store/products";
import Pagination from "../Pagination/Pagination";
import "./HalloweenProducts.css";

function HalloweenProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.halloweenProducts);

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
    dispatch(getHalloweenProductsThunk());
  }, []);

  return (
    <div className="hw-products">
      <div className="hw-products__header__container">
        <img
          src="https://cdn.accentuate.io/275496009901/1634743319282/2022-Halloween-Desktop-300-1.jpg?v=1661796674480"
          alt="falling candy"
          className="hw-products__header__image"
        />
      </div>
      <div className="hw-products__header-2__container ">
        <div className="hw-products__header-2__text">
          Terrifyingly Tasty Treats For Everyone!
        </div>
      </div>

      <div>
        <Toaster />
      </div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-32 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-32">
          {products.length > 0 &&
            currentProducts.map((product) => (
              <div className="hw-products__product__container" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 m-30">
                    <img
                      src={product.imageUrl}
                      alt={product.description}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                </Link>
                <div className="hw-products__product-info__container">
                  <b className="hw-products__product-info__text">
                    {product.name}
                  </b>
                  <div className="hw-products__product-info__container__bottom">
                    <b className="hw-products__product-info__price">
                      ${product.price}
                    </b>
                    <button
                      className="hw-products__product-info__button"
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

export default HalloweenProducts;

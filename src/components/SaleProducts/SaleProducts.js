import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { addCartThunk } from "../../store/cart";
import { getSaleProductsThunk } from "../../store/products";
import Pagination from "../Pagination/Pagination";
import "./SaleProducts.css";

function SaleProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.saleProducts);

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
    dispatch(getSaleProductsThunk());
  }, []);

  return (
    <div className="sale-products">
      <div className="sale-products__header__image__container">
        <img
          src="https://cdn.accentuate.io/92194897974/1637831962110/2022-Sale-Desktop--300-1.jpg?v=1649256567242"
          alt="falling candy"
          className="sale-products__header__image"
        />
      </div>
      <div className="sale-products__header__text__container">
        <div className="sale-products__header__text">
          Whats Better Than Sweets For LESS!
        </div>
      </div>

      <div>
        <Toaster />
      </div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-32 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-32">
          {products.length > 0 &&
            currentProducts.map((product) => (
              <div
                className="sale-products__product__container"
                key={product.id}
              >
                <Link to={`/products/${product.id}`}>
                  <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 m-30">
                    <img
                      src={product.imageUrl}
                      alt={product.description}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                </Link>
                <div className="sale-products__product-info__container">
                  <b className="sale-products__product-info__container__text">
                    {product.name}
                  </b>
                  <div className="sale-products__product-info__container__bottom">
                    <b className="sale-products__product-info__container__bottom__price">
                      ${product.price}
                    </b>
                    <button
                      className="sale-products__product-info__container__bottom__button"
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

export default SaleProducts;

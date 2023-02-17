import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { addCartThunk } from "../../store/cart";
import { getGiftProductsThunk } from "../../store/products";
import Pagination from "../Pagination/Pagination";
import "./Gifts.css";

function Gifts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.gifts);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentProducts = products.slice(indexOfFirstRecord, indexOfLastRecord);
  const numberOfPages = Math.ceil(products.length / recordsPerPage);

  const bg =
    "https://previews.123rf.com/images/jenifoto/jenifoto1909/jenifoto190900018/129730647-halloween-candy-double-border-banner-on-a-white-background-with-copy-space.jpg";

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
    dispatch(getGiftProductsThunk());
  }, []);

  return (
    <div className="gifts">
      <div style={{ backgroundImage: `url(${bg})` }} className="gifts__header">
        <div className="gifts__header__text">Gifts, Gifts and more Gifts!</div>
      </div>

      <div>
        <Toaster />
      </div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-32 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-32">
          {products.length > 0 &&
            currentProducts.map((product) => (
              <div className="gifts__product__conatiner" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 m-30">
                    <img
                      src={product.imageUrl}
                      alt={product.description}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                </Link>
                <div className="gifts__product-info__container">
                  <b className="gifts__product-info__container__text">
                    {product.name}
                  </b>
                  <div className="gifts__product-info__container__bottom">
                    <b className="gifts__product-info__container__bottom__price ">
                      ${product.price}
                    </b>
                    <button
                      className="gifts__product-info__container__bottom__button"
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

export default Gifts;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartThunk } from "../../store/cart";
import toast, { Toaster } from "react-hot-toast";
import { getBulkProductsThunk } from "../../store/products";
import Pagination from "../Pagination/Pagination";
import "./BulkCandy.css";

function BulkCandy() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.bulkProducts);
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
    dispatch(getBulkProductsThunk());
  }, []);

  return (
    <div className="bulk-candy">
      <div className="bulk-candy__video__container">
        <img
          src="https://cdn.accentuate.io/174691221558/1634743616440/2020_CatergoryBanner_BulkCandySpill_1440x350_6e56ec1f-0ae3-4771-80c1-2d87207b7821.gif?v=0"
          alt="falling candy"
          className="bulk-candy__video"
        />
      </div>
      <div className="bulk-candy__header__container">
        <div className="bulk-candy__header__text">
          More Is Better, Buy In Bulk
        </div>
      </div>

      <div>
        <Toaster />
      </div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 gap-x-32 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-40">
          {products.length > 0 &&
            currentProducts.map((product) => (
              <div className="bulk-candy__product-container" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 m-30">
                    <img
                      src={product.imageUrl}
                      alt={product.description}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                </Link>
                <div className="bulk-candy__product__text__container">
                  <b className="bulk-candy__product__text-top">
                    {product.name}
                  </b>
                  <div className="bulk-candy__product__text-bottom__container">
                    <b className="bulk-candy__product__text-bottom__price">
                      ${product.price}
                    </b>
                    <button
                      className="bulk-candy__product__text-bottom__button"
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

export default BulkCandy;

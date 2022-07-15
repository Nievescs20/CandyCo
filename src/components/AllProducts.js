import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsThunk } from "../store/products";

function AllProducts(props) {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  console.log("products", products);

  return (
    <div className="product-container">
      {products.length > 0 &&
        products.map((product) => (
          <div className="product" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div className="text-3xl font-bold underline">{product.name}</div>
              <img src={product.imageUrl} alt={`${product.name}-figure`} />
              <div>{product.description}</div>
              <div>{product.price}</div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default AllProducts;

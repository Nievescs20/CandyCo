import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductThunk } from "../store/singleProduct";

function SingleProduct(props) {
  const singleProduct = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();
  const { id } = useParams();
  const params = useParams();

  useEffect(() => {
    dispatch(getProductThunk(id));
  }, []);

  console.log(params);

  return (
    <div className="container">
      <div>{singleProduct.name}</div>
      <img
        className="figurine"
        src={singleProduct.imageUrl}
        alt={`${singleProduct.name}-figure`}
      />
      <div>{singleProduct.description}</div>
      <div>{singleProduct.price}</div>
    </div>
  );
}

export default SingleProduct;

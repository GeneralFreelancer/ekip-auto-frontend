import React from "react";
import Description from "./Description/Description";
import ProductItem from "./ProductItem/ProductItem";

const Product = ({productId}) => {
  return (
    <>
      <section>
        <ProductItem productId={productId}/>
      </section>
      <Description productId={productId}/>
    </>
  );
};

export default Product;

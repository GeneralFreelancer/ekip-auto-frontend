import React from "react";
import Description from "./Description/Description";
import ProductItem from "./ProductItem/ProductItem";

const Product = () => {
  return (
    <>
      <section>
        <ProductItem />
      </section>
      <Description />
    </>
  );
};

export default Product;

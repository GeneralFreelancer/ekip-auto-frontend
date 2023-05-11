import React from "react";
import Description from "./Description";
import ProductItem from "./ProductItem";
import Breadcrumbs from "../Breadcrumps";

const Product = ({ productId }) => {
  return (
    <>
      <section>
        <Breadcrumbs />
      </section>
      <section>
        <ProductItem productId={productId} />
      </section>
      <Description productId={productId} />
    </>
  );
};

export default Product;

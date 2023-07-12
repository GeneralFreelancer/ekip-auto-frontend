import React from "react";
import Description from "./Description";
import ProductItem from "./ProductItem";
import Breadcrumbs from "../Breadcrumps";

const Product = ({ product }) => {
  return (
    <>
      <section>
        {Object.keys(product).length && (
          <Breadcrumbs selectedProduct={product} />
        )}
      </section>
      <section>
        {Object.keys(product).length && (
          <ProductItem selectedProduct={product} />
        )}
      </section>
      {Object.keys(product).length && <Description selectedProduct={product} />}
    </>
  );
};

export default Product;

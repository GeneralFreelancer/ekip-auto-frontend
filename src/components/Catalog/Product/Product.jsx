import React from "react";
import Description from "./Description";
import ProductItem from "./ProductItem";
import Breadcrumbs from "../Breadcrumps";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../../redux/features/productsSlice";

const Product = ({ productId }) => {
  const allProducts = useSelector(selectAllProducts);

  const selectedProduct = allProducts.find(
    (product) => product.id === productId
  );

  return (
    <>
      <section>
        <Breadcrumbs selectedProduct={selectedProduct}/>
      </section>
      <section>
        <ProductItem selectedProduct={selectedProduct}/>
      </section>
      <Description selectedProduct={selectedProduct}/>
    </>
  );
};

export default Product;

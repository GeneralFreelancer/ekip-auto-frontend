import React from 'react';
import Description from './Description';
import ProductItem from './ProductItem';
import Breadcrumbs from '../Breadcrumps';
import {selectOneProduct} from '../../../redux/features/productsSlice';
import {useSelector} from 'react-redux';

const Product = () => {
  const oneProduct = useSelector(selectOneProduct);

  return (
    <>
      <section>
        {Object.keys(oneProduct).length > 0 && (
          <Breadcrumbs selectedProduct={oneProduct} paddingTop={true} />
        )}
      </section>
      <section>
        {Object.keys(oneProduct).length > 0 && (
          <ProductItem selectedProduct={oneProduct} />
        )}
      </section>
      {Object.keys(oneProduct).length > 0 && (
        <Description selectedProduct={oneProduct} />
      )}
    </>
  );
};

export default Product;

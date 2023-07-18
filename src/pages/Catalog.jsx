import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal/AuthModal";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CallBackButton from "../components/CallBackButton";
import { useSelector } from "react-redux";
import { selectedUser } from "../redux/features/userSlice";
import MainContainer from "../components/MainContainer";
import CatalogComponents from "../components/CatalogComponents/CatalogComponents";
import {
  selectCategoryProducts,
  selectSubCategoryProducts,
  selectLoading,
  setCategoryProducts,
  setSubCategoryProducts,
  setLoading
} from "../redux/features/productsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  getProductsWithDateFilter,
  getProductsWithTopFilter,
  getProductsWithLast_seenFilter,
  getProductsWithInterestFilter,
  getProductsAll,
} from "../productService";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Catalog = ({ products, title }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const user = useSelector(selectedUser);
  const categoryProducts = useSelector(selectCategoryProducts);
  const subCategoryProducts = useSelector(selectSubCategoryProducts);

  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    const category = localStorage.getItem("category");
    const subCategory = localStorage.getItem("subcategory");
    const fetchProductsByCategory = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `${baseUrl}/product/?category=${category}`
        );
        dispatch(setLoading(false));
        dispatch(setCategoryProducts(response.data.products));
      } catch (error) {
        console.error("Error:", error.message);
        dispatch(setLoading(false));
      }
    };
    const fetchProductsBySubCategory = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `${baseUrl}/product/?subcategory=${subCategory}`
        );
        dispatch(setLoading(false));
        dispatch(setSubCategoryProducts(response.data.products));
      } catch (error) {
        console.error("Error:", error.message);
        dispatch(setLoading(false));
      }
    };
    if (!categoryProducts?.length && localStorage.getItem("category")) {
      fetchProductsByCategory();
    } else if (
      !subCategoryProducts?.length &&
      localStorage.getItem("subcategory")
    ) {
      fetchProductsBySubCategory();
    }
  }, []);

  useEffect(() => {
    if (title === "Останні надходження" && products.length === 0) {
      getProductsWithDateFilter(dispatch);
      getProductsAll(dispatch);
    } else if (title === "Топ продажу" && products.length === 0) {
      getProductsWithTopFilter(dispatch);
      getProductsAll(dispatch);
    } else if (title === "Останні переглянуті" && products.length === 0) {
      getProductsWithLast_seenFilter(dispatch);
      getProductsAll(dispatch);
    } else if (title === "Вас може зацікавити" && products.length === 0) {
      getProductsWithInterestFilter(dispatch);
      getProductsAll(dispatch);
    }
  }, [dispatch, products, title]);

  const showModalHandler = () => {
    if (user.isLoggedIn || user.isRegisteredConfirmed) {
      setModalIsVisible(false);
    } else if (user.isRegistered || !user.isLoggedIn) {
      setModalIsVisible(true);
    }
  };

  const hideModalHandler = () => {
    setModalIsVisible(false);
  };

  return (
    <>
      {modalIsVisible && <AuthModal onHideModal={hideModalHandler} />}
      <Navbar onShowModal={showModalHandler} />
      <MainContainer>
        {isLoading ? (
         <div className="loader"></div>
        ) : (
          <>
            {products?.length > 0 && (
              <CatalogComponents products={products} title={title} />
            )}
            {categoryProducts?.length > 0 && !subCategoryProducts?.length && (
              <CatalogComponents
                products={categoryProducts}
                title={categoryProducts[0]?.category}
              />
            )}
            {subCategoryProducts?.length > 0 && (
              <CatalogComponents
                products={subCategoryProducts}
                title={subCategoryProducts[0]?.subCategory}
              />
            )}
            {!products?.length && !categoryProducts?.length && !subCategoryProducts?.length && (
              <h1 style={{ textAlign: "center", marginTop: "70px" }}>
                Товар у данній категорії відсутній
              </h1>
            )}
          </>
        )}
      </MainContainer>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={"38.9"} />
    </>
  );
};

export default Catalog;

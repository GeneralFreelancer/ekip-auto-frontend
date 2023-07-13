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
  setCategoryProducts,
  setSubCategoryProducts,
} from "../redux/features/productsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Catalog = ({ products, title }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const user = useSelector(selectedUser);
  const categoryProducts = useSelector(selectCategoryProducts);
  const subCategoryProducts = useSelector(selectSubCategoryProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    const category = localStorage.getItem("category");
    const subCategory = localStorage.getItem("subcategory");

    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/product/?category=${category}`
        );
        dispatch(setCategoryProducts(response.data.products));
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    const fetchProductsBySubCategory = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/product/?subcategory=${subCategory}`
        );
        dispatch(setSubCategoryProducts(response.data.products));
      } catch (error) {
        console.error("Error:", error.message);
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
        {products?.length > 0 && (
          <CatalogComponents products={products} title={title} />
        ) 
        // : (
        //   <CatalogComponents products={products} title={title} />
        // )
        }
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
      </MainContainer>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={"38.9"} />
    </>
  );
};

export default Catalog;

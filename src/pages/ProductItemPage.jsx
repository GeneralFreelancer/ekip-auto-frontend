import React, { useState, useEffect } from "react";
import Product from "../components/Catalog/Product/Product";
import MainContainer from "../components/MainContainer/MainContainer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal/AuthModal";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CallBackButton from "../components/CallBackButton";
import { useSelector } from "react-redux";
import { selectedUser } from "../redux/features/userSlice";
import ListCards from "../components/ListCards/ListCards";
import { useParams } from "react-router-dom";
import { getProductsWithInterestFilter } from "../productService";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  setAllProducts,
  setOneProduct,
  selectInterestProducts,
  selectOneProduct,
} from "../redux/features/productsSlice";
import { useLocation } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

const ProductItemPage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector(selectedUser);
  const interestProducts = useSelector(selectInterestProducts);
  const oneProduct = useSelector(selectOneProduct);

  const { id } = useParams();

  const dispatch = useDispatch();
  const location = useLocation();

  const getOneProduct = async () => {
    try {
      const response = await axios.get(`${baseUrl}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(setOneProduct(response.data.product));
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOneProduct();
  }, [location.pathname]);

  const getProductsAll = async () => {
    try {
      const response = await axios.get(`${baseUrl}/product`);
      dispatch(setAllProducts(response.data.products));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getProductsAll();
    getProductsWithInterestFilter(dispatch);
  }, [dispatch]);

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
            <Product />
            <div style={{ paddingTop: "30px" }}>
              <ListCards
                title={"Вас може зацікавити"}
                items={interestProducts}
              />
            </div>
          </>
        )}
      </MainContainer>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={"38.9"} />
    </>
  );
};

export default ProductItemPage;

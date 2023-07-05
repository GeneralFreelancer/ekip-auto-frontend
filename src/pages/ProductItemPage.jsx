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
import { selectInterestProducts } from "../redux/features/productsSlice";
import { useParams } from "react-router-dom";
import { getProductsAll, getProductsWithInterestFilter } from "../productService";
import { useDispatch } from "react-redux";

const ProductItemPage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const user = useSelector(selectedUser);
  const interestProducts = useSelector(selectInterestProducts);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    getProductsAll(dispatch);
    getProductsWithInterestFilter(dispatch)
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
        <Product productId={id} />
        <div style={{ paddingTop: "30px" }}>
          <ListCards title={"Вас може зацікавити"} items={interestProducts} />
        </div>
      </MainContainer>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={"38.9"} />
    </>
  );
};

export default ProductItemPage;

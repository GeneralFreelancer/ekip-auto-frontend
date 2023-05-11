import React, { useState } from "react";
import Product from "../components/Catalog/Product/Product";
import MainContainer from "../components/MainContainer/MainContainer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal/AuthModal";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CallBackButton from "../components/CallBackButton";
import { useSelector } from "react-redux";
import { selectedUser } from "../redux/features/userSlice";
import { Outlet } from "react-router-dom";

const ProductItemPage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const user = useSelector(selectedUser);

  const showModalHandler = () => {
    if (user.isLoggedIn || user.isRegistered) {
      setModalIsVisible(false);
    } else {
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
      <section>
        <MainContainer>
          {/* <Outlet/> */}
          <Product />
        </MainContainer>
      </section>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={"38.9"} />
    </>
  );
};

export default ProductItemPage;

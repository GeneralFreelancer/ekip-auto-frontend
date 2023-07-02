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
import ListCards from "../components/ListCards/ListCards";

const ProductItemPage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const user = useSelector(selectedUser);

  const showModalHandler = () => {
    if (user.isLoggedIn) {
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
        <Product />
        <div style={{paddingTop: '30px'}}>
          <ListCards title={"Вас може зацікавити"} />
        </div>
      </MainContainer>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={"38.9"} />
    </>
  );
};

export default ProductItemPage;

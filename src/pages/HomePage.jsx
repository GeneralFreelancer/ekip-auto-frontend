import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import AuthModal from "../components/AuthModal/AuthModal";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CallBackButton from "../components/CallBackButton";
import Slider from "../components/Slider";
import ListCards from "../components/ListCards/ListCards";

const HomePage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const showModalHandler = () => {
    if (localStorage.getItem("authSuccess")) {
      // localStorage
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
      <Container/>
      <Slider />
      <ListCards title={'Останні надходження'}/>
      <ListCards title={'Топ продажу'}/>
      <ListCards title={'Останні переглянуті'}/>
      <ListCards title={'Вас може зацікавити'}/>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={"38.9"} />
    </>
  );
};

export default HomePage;

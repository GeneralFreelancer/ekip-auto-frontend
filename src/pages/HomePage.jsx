import React, { useState } from "react";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Container from "../components/Container";
import AuthModal from "../components/AuthModal/AuthModal";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CallBackButton from "../components/CallBackButton";


const HomePage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(true);

  const hideModalHandler = () => {
    setModalIsVisible(false);
  };

  return(
    <>
    {modalIsVisible && <AuthModal onHideModal={hideModalHandler} />}
      <Navbar />
      <Container />
      <ScrollToTopButton/>
      <CallBackButton />
      <Footer />
    </>
  )
}

export default HomePage;
import React, { useState } from "react";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Container from "../components/Container";
import AuthModal from "../components/AuthModal/AuthModal";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CallBackButton from "../components/CallBackButton";
import Slider from '../components/Slider';
import ListCards from "../components/ListCards/ListCards";


const HomePage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const hideModalHandler = () => {
    setModalIsVisible(false);
  };

  return(
    <>
    {modalIsVisible && <AuthModal onHideModal={hideModalHandler} />}
      <Navbar />
      <Slider />
      <ListCards />
      <ScrollToTopButton/>
      <CallBackButton />
      <Footer currentRate={'38.9'}/>
    </>
  )
}

export default HomePage;
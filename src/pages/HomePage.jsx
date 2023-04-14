import React, { useState } from "react";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Modal from "../components/Modal";
import Container from "../components/Container";


const HomePage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(true);

  const hideCartHandler = () => {
    setModalIsVisible(false);
  };
  return(
    <>
    {modalIsVisible && <Modal onHideCart={hideCartHandler} />}
      <Navbar />
      <Container />
      <Footer />
    </>
  )
}

export default HomePage;
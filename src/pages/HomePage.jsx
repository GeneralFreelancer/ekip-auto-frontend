import React, { useState } from "react";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Modal from "../components/Modal";


const HomePage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(true);

  const hideCartHandler = () => {
    setModalIsVisible(false);
  };
  return(
    <>
    {modalIsVisible && <Modal onHideCart={hideCartHandler} />}
      <Navbar />
      <Footer />
    </>
  )
}

export default HomePage;
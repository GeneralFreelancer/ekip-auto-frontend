import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal/AuthModal";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CallBackButton from "../components/CallBackButton";
import { useSelector } from "react-redux";
import { selectedUser } from "../redux/features/userSlice";
import MainContainer from "../components/MainContainer";
import About from "../components/AboutUs";

const AboutUs = () => {
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
        <About />
      </MainContainer>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={"38.9"} />
    </>
  );
};

export default AboutUs;

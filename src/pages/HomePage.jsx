import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal/AuthModal";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CallBackButton from "../components/CallBackButton";
import Slider from "../components/Slider";
import ListCards from "../components/ListCards/ListCards";
import { useSelector } from "react-redux";
import { selectedUser } from "../features/userSlice";

const HomePage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const user = useSelector(selectedUser);

  const showModalHandler = () => {
    if (user.isLoggedIn) {
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
      <Slider />
      <ListCards title={"Останні надходження"} />
      <ListCards title={"Топ продажу"} />
      <ListCards title={"Останні переглянуті"} />
      <ListCards title={"Вас може зацікавити"} />
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={"38.9"} />
    </>
  );
};

export default HomePage;

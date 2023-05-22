import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal/AuthModal";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CallBackButton from "../components/CallBackButton";
import { useSelector } from "react-redux";
import { selectedUser } from "../redux/features/userSlice";
import MainContainer from "../components/MainContainer";
import AdminComponentsSlider from "../components/AdminPageComponents/AdminComponentsSlider";

const AdminSliderPage = () => {
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
      <MainContainer>
        <AdminComponentsSlider />
      </MainContainer>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={"38.9"} />
    </>
  );
};

export default AdminSliderPage;

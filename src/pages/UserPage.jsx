import { useState } from "react";
import { useSelector } from "react-redux";
import { selectedUser } from "../redux/features/userSlice";

import UserPageComponent from "../components/UserPageComponent";
import Navbar from "../components/Navbar";
import MainContainer from "../components/MainContainer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CallBackButton from "../components/CallBackButton";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";

export default function UserPage() {
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
          <UserPageComponent />
        </MainContainer>
      </section>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer />
    </>
  );
}

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal/AuthModal";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CallBackButton from "../components/CallBackButton";
import ListCards from "../components/ListCards/ListCards";
import { useSelector } from "react-redux";
import { selectedUser } from "../redux/features/userSlice";
import SideBarSlider from "../components/SideBarSlider/";
import MainContainer from "../components/MainContainer";
import { useDispatch } from "react-redux";
import {
  selectDateProducts,
  selectTopProducts,
  selectLastSeenProducts,
  selectInterestProducts,
} from "../redux/features/productsSlice";
import {
  getProductsAll,
  getProductsWithDateFilter,
  getProductsWithTopFilter,
  getProductsWithLast_seenFilter,
  getProductsWithInterestFilter,
} from "../productService";
import {
  setAdvertisingDesktop,
  setAdvertisingTablet,
  setAdvertisingMobile,
} from "../redux/features/advertisingSlice";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const HomePage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const user = useSelector(selectedUser);

  const dispatch = useDispatch();
  const dateProducts = useSelector(selectDateProducts);
  const topProducts = useSelector(selectTopProducts);
  const LastSeenProducts = useSelector(selectLastSeenProducts);
  const interestProducts = useSelector(selectInterestProducts);

  // const viewportWidth = window.innerWidth;

  useEffect(() => {
    const getSlidersImages = async () => {
      try {
        const response = await axios.get(`${baseUrl}/advertising`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        // if (viewportWidth <= 540) {
          dispatch(setAdvertisingMobile(response.data.advertising?.mobile));
        // } else if (viewportWidth <= 1024) {
          dispatch(setAdvertisingTablet(response.data.advertising?.tablet));
        // } else {
          dispatch(setAdvertisingDesktop(response.data.advertising?.desktop));
        // }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    getSlidersImages();
  }, [dispatch, user.token]);

  useEffect(() => {
    getProductsAll(dispatch);
    getProductsWithDateFilter(dispatch);
    getProductsWithTopFilter(dispatch);
    getProductsWithLast_seenFilter(dispatch, user);
    getProductsWithInterestFilter(dispatch);
  }, [dispatch, user]);

  const showModalHandler = () => {
    if (user.isLoggedIn || user.isRegisteredConfirmed) {
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
        <SideBarSlider />
        <ListCards title={"Останні надходження"} items={dateProducts} />
        <ListCards title={"Топ продажу"} items={topProducts} />
        <ListCards title={"Останні переглянуті"} items={LastSeenProducts} />
        <ListCards title={"Вас може зацікавити"} items={interestProducts} />
      </MainContainer>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={"38.9"} />
    </>
  );
};

export default HomePage;

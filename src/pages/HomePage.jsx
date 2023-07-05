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
// import axios from "axios";
import { useDispatch } from "react-redux";
// import {
//   setAllProducts,
//   setDateProducts,
//   setTopProducts,
//   setLastSeenProducts,
//   setInterestProducts,
// } from "../redux/features/productsSlice";
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
} from '../productService';

// const baseUrl = process.env.REACT_APP_BASE_URL;

const HomePage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const user = useSelector(selectedUser);

  const dispatch = useDispatch();
  const dateProducts = useSelector(selectDateProducts);
  const topProducts = useSelector(selectTopProducts);
  const LastSeenProducts = useSelector(selectLastSeenProducts);
  const interestProducts = useSelector(selectInterestProducts);

  // const getProductsAll = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/product`);
  //     dispatch(setAllProducts(response.data.products));
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };

  // const getProductsWithDateFilter = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/product/?filter=date`);
  //     dispatch(setDateProducts(response.data.products));
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };

  // const getProductsWithTopFilter = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/product/?filter=top`);
  //     dispatch(setTopProducts(response.data.products));
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };

  // const getProductsWithLast_seenFilter = async () => {
  //   try {
  //     let response;
  //     if (user.isLoggedIn) {
  //       response = await axios.get(
  //         `${baseUrl}/product/?filter=last_seen&userId=${user.userdata.id}` 
  //       );
  //     } else {
  //       response = await axios.get(`${baseUrl}/product/?filter=last_seen`);
  //     }
  //     dispatch(setLastSeenProducts(response.data.products));
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };

  // const getProductsWithInterestFilter = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/product/?filter=interest`);
  //     dispatch(setInterestProducts(response.data.products));
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };

  // useEffect(() => {
  //   getProductsAll();
  //   getProductsWithDateFilter();
  //   getProductsWithTopFilter();
  //   getProductsWithLast_seenFilter();
  //   getProductsWithInterestFilter();
  // }, []);

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

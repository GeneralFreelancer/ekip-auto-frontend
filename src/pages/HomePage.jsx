import React, {useEffect, useState} from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal/AuthModal';
import ScrollToTopButton from '../components/ScrollToTopButton';
import CallBackButton from '../components/CallBackButton';
import ListCards from '../components/ListCards/ListCards';
import {useSelector} from 'react-redux';
import {selectedUser} from '../redux/features/userSlice';
import SideBarSlider from '../components/SideBarSlider/';
import MainContainer from '../components/MainContainer';
import {useDispatch} from 'react-redux';
import {
  selectDateProducts,
  selectTopProducts,
  selectLastSeenProducts,
  selectInterestProducts,
} from '../redux/features/productsSlice';
import {
  getProductsAll,
  getProductsWithDateFilter,
  getProductsWithTopFilter,
  getProductsWithLast_seenFilter,
  getProductsWithInterestFilter,
} from '../productService';
import {
  setAdvertisingDesktop,
  setAdvertisingTablet,
  setAdvertisingMobile,
} from '../redux/features/advertisingSlice';
import {getAdvertisingData} from '../api/advertisingRequests';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const HomePage = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector(selectedUser);

  const dispatch = useDispatch();
  const dateProducts = useSelector(selectDateProducts);
  const topProducts = useSelector(selectTopProducts);
  const LastSeenProducts = useSelector(selectLastSeenProducts);
  const interestProducts = useSelector(selectInterestProducts);

  useEffect(() => {
    const getCurrency = async () => {
      try {
        const response = await axios.get(`${baseUrl}/exchange`);
        localStorage.removeItem('exchangeRate');
        localStorage.setItem('exchangeRate', response.data.usdRate);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    getCurrency();
  }, []);

  useEffect(() => {
    const getSlidersImages = async () => {
      try {
        const response = await getAdvertisingData({
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        dispatch(setAdvertisingMobile(response.data.advertising?.mobile));
        setIsLoading(false);
        dispatch(setAdvertisingTablet(response.data.advertising?.tablet));
        setIsLoading(false);
        dispatch(setAdvertisingDesktop(response.data.advertising?.desktop));
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error.message);
        setIsLoading(false);
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

  useEffect(() => {
    if (!localStorage.getItem('exchangeRate')) {
      localStorage.setItem('exchangeRate', 37);
    }
  }, []);

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
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <>
            <SideBarSlider />
            <ListCards title={'Останні надходження'} items={dateProducts} />
            <ListCards title={'Топ продажу'} items={topProducts} />
            <ListCards title={'Останні переглянуті'} items={LastSeenProducts} />
            <ListCards title={'Вас може зацікавити'} items={interestProducts} />
          </>
        )}
      </MainContainer>
      <ScrollToTopButton />
      <CallBackButton />
      <Footer currentRate={'38.9'} />
    </>
  );
};

export default HomePage;

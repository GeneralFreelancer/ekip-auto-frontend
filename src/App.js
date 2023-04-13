import React, { useState } from "react";
import NavbarLink from "./components/NavbarLink";
import SearchBar from "./components/SearchBar";
import Modal from "./components/Modal";
import "./index.scss";
// import { Routes, Route } from "react-router-dom";
import Basket from "./components/Basket";
import AuthNav from "./components/AuthNav";
// import HomePage from './pages/HomePage'

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(true);

  const hideCartHandler = () => {
    setModalIsVisible(false);
  };

  return (
    <main>
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
        }}
      >
        {modalIsVisible && <Modal onHideCart={hideCartHandler} />}
        <NavbarLink />
        <SearchBar />
        <Basket />
        <AuthNav />
      </div>
    </main>
  );
}


export default App;

/*
// <Routes> 
            //   <Route path="/" element={<HomePage />} /> 
            //     <Route path="/" element={<SharedLayout />}> 
            //         <Route path="/" element={<Home />} /> 
            //         <Route path="catalog" element={<Catalog />} /> 
            //         <Route path="about" element={<About />} />
            //         <Route path="partners" element={<Partners />} />
            //         <Route path="delivery" element={<Delivery />} />
                  
            //         <Route path='/catalog' element={<CatalogPage />}/>
            //         <Route path='/catalog/:sorted' element={<CatalogPage />}/>
            //         <Route path='/catalog/subcategory' element={<CatalogPage />}/>
            //         <Route path='category/subcategory/:id' element={<ProductPage />} />
                           
            //     // privare routes
            //         <Route path='/myprofile' element={loggedIn ? <Navigate to='/myprofile/basket' /> : <Redirect to='/' />}>
            //             <Route path='/mydata' element={loggedIn ? <MyDataPage /> : <Redirect to='/' />} />
            //             <Route path='/basket' element={loggedIn ? <BasketPage /> : <Redirect to='/' />} />
            //             <Route path='/orders' element={loggedIn ? <OrdersPage /> : <Redirect to='/' />} />
            //             <Route path='/selected' element={loggedIn ? <SelectedPage /> : <Redirect to='/' />} />
            //         </Route>
        
                        <Route path="*" element={<NotFound />} />
            //         </Route>
            // </Routes>
        </div>
    );
};



// import { useSelector } from "react-redux";
// import { useMediaQuery } from "react-responsive";
// import { Navigate } from "react-router-dom";
// import { userSelector } from "../../redux/selector/user-selector";

// export const PrivateRoute = ({ children, navigateTo }) => {
//   const isLogin = useSelector(userSelector.getIsLogin);
//   const isMobile = useMediaQuery({ maxWidth: 767 });
//   if (isLogin) return children;
//   if (isMobile) return <Navigate to="/info" />;
//   return <Navigate to={navigateTo} />;
// };


/* <Route
              path="register"
              element={
                <PublicRoute navigateTo="/">
                  <Register />
                </PublicRoute>
              }
            />

            <Route
              path="training"
              element={
                <PrivateRoute navigateTo="/login">
                  <TrainingPage />
                </PrivateRoute>
              } */

//               import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import { userSelector } from '../../redux/selector/user-selector';

// export const PublicRoute = ({ children, navigateTo }) => {
//   const isLogin = useSelector(userSelector.getIsLogin);
//   return !isLogin ? children : <Navigate to={navigateTo} />;
// };

import "./index.scss";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import { useSelector } from "react-redux";
import { selectedUser } from "./redux/features/userSlice";
import Cart from "./components/UserPageComponent/Cart/Cart";
import MyData from "./components/UserPageComponent/MyData/MyData";
import Product from "./components/Catalog/Product/Product";
import Catalog from "./pages/Catalog";
import Favorite from "./components/Favorite";
import ProductItemPage from "./pages/ProductItemPage";
import AdminSliderPage from "./pages/AdminSliderPage";
import AdminProductPhotoPage from "./pages/AdminProductPhotoPage";

function App() {
  const user = useSelector(selectedUser);

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="admin_slider" element={<AdminSliderPage />} />
        <Route path="admin_product_photo" element={<AdminProductPhotoPage />} />

        <Route path="catalog" element={<Catalog />} />

        {/* </Route> */}
        <Route
          path="catalog/category/subcategory/:id"
          element={<ProductItemPage />}
        />

        <Route path="myprofile" element={<UserPage />}>
          <Route
            path="mydata"
            element={<MyData />}
            index //не працює
            // element={user.isLoggedIn ? <MyData /> : <Navigate to="/" />}
          />
          <Route
            path="basket"
            element={<Cart />}
            // element={user.isLoggedIn ? <MyData /> : <Navigate to="/" />}
          />
          <Route
            path="favorite"
            element={<Favorite />}
            // element={user.isLoggedIn ? <MyData /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
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

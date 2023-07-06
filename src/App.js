import "./index.scss";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import Cart from "./components/UserPageComponent/Cart/Cart";
import MyData from "./components/UserPageComponent/MyData/MyData";
import Catalog from "./pages/Catalog";
import Favorite from "./components/Favorite";
import ProductItemPage from "./pages/ProductItemPage";
import OrderList from "./components/UserPageComponent/Order/OrderList";
import OrderDetails from "./components/UserPageComponent/OrderDetails/OrderDetails";
import AdminSliderPage from "./pages/AdminSliderPage";
import AdminProductPhotoPage from "./pages/AdminProductPhotoPage";
import AdminShareStocksPage from "./components/AdminPageComponents/AdminShare/AdminComponentsShare";
import PartnerPage from "./pages/PartnerPage";
import AboutUs from "./pages/AboutUs";
import RedirectPage from "./pages/RedirectPage";
import { PivateRouter } from "./components/AuthModal/PrivateRouter";
import { ProtectedRoute } from "./components/AuthModal/protectedRoute";
import {
  selectDateProducts,
  selectTopProducts,
  selectLastSeenProducts,
  selectInterestProducts,
} from "./redux/features/productsSlice";
import { useSelector } from "react-redux";

function App() {
  const dateProducts = useSelector(selectDateProducts);
  const topProducts = useSelector(selectTopProducts);
  const lastSeenProducts = useSelector(selectLastSeenProducts);
  const interestProducts = useSelector(selectInterestProducts);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="partners" element={<PartnerPage />} />
        <Route path="about" element={<AboutUs />} />

        <Route path="/confirm-email/:code" element={<RedirectPage />} />

        <Route
          path="admin_slider"
          element={
            <PivateRouter>
              <AdminSliderPage />{" "}
            </PivateRouter>
          }
        />

        <Route
          path="admin_product_photo"
          element={
            <PivateRouter>
              <AdminProductPhotoPage />
            </PivateRouter>
          }
        />

        <Route
          path="ostannі-nadkhodzhennya"
          element={
            <Catalog products={dateProducts} title={"Останні надходження"} />
          }
        />
        <Route
          path="top-prodazhu"
          element={<Catalog products={topProducts} title={"Топ продажу"} />}
        />
        <Route
          path="ostannі-pereglyanutі"
          element={
            <Catalog
              products={lastSeenProducts}
              title={"Останні переглянуті"}
            />
          }
        />
        <Route
          path="vas-mozhe-zatsіkaviti"
          element={
            <Catalog
              products={interestProducts}
              title={"Вас може зацікавити"}
            />
          }
        />

        {/* <Route path=":category/:subcategory/" element={<Catalog />} /> */}
        {/* передавать на бек категорію чи підкатегорію */}

        <Route
          path="/:id"
          element={<ProductItemPage />}
        />
        <Route
          path="ostannі-nadkhodzhennya/:id"
          element={<ProductItemPage />}
        />
        <Route path="ostannі-pereglyanutі/:id" element={<ProductItemPage />} />
        <Route path="vas-mozhe-zatsіkaviti/:id" element={<ProductItemPage />} />
        <Route path="top-prodazhu/:id" element={<ProductItemPage />} />

        <Route path="myprofile" element={<UserPage />}>
          <Route
            path="mydata"
            element={
              <ProtectedRoute>
                <MyData />
              </ProtectedRoute>
            }
            default //не працює
            // element={user.isLoggedIn ? <MyData /> : <Navigate to="/" />}
          />
          <Route
            path="basket"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
            // element={user.isLoggedIn ? <MyData /> : <Navigate to="/" />}
          />
          <Route
            path="order-history"
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route path="order-history-details" element={<OrderDetails />} />
          <Route
            path="favorite"
            element={
              <ProtectedRoute>
                <Favorite />
              </ProtectedRoute>
            }
            // element={user.isLoggedIn ? <MyData /> : <Navigate to="/" />}
          />

          {/* http://localhost:3000/myprofile/share-stocks */}
          <Route path="share-stocks" element={<AdminShareStocksPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

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

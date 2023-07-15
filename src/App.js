import React, { useEffect, useState } from "react";
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
              <AdminSliderPage />
            </PivateRouter>
          }
        />

        <Route
          path="admin_product_photo/:id"
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

        <Route path="/category" element={<Catalog />} />
        <Route path="/:id" element={<ProductItemPage />} />
        {/* <Route path="/category/:id" element={<ProductItemPage />} /> */}

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
          />
          <Route
            path="basket"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="order-history"
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route path="order-history-details/:id" element={<OrderDetails />} />
          <Route
            path="favorite"
            element={
              <ProtectedRoute>
                <Favorite />
              </ProtectedRoute>
            }
          />
          <Route path="share-stocks" element={<AdminShareStocksPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

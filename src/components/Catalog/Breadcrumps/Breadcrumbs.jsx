import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import s from "./Breadcrumbs.module.scss";
import { setSubCategoryProducts, setCategoryProducts } from "../../../redux/features/productsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Breadcrumbs = (props) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const parts = ["category", "name"]; // mocked

  const BREADCRUMB_TEXTS = {
    category: props.selectedProduct.category,
    name: trimString(props.selectedProduct.name),
  };

  const fetchProductsByCategory = async(title) => {
    try {
      const response = await axios.get(`${baseUrl}/product/?category=${title}`);
      dispatch(setCategoryProducts(response.data.products));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  function trimString(str) {
    if (str.length > 20) {
      return str.slice(0, 20) + "...";
    } else {
      return str;
    }
  }

  return (
    <div className={s.breadcrumbs_block}>
      {parts.length > 0 && (
        <React.Fragment key={0}>
          <div className={s.breadcrumbs_item}>
            <Link to="/">Головна</Link>
          </div>
          <div>{" > "}</div>
        </React.Fragment>
      )}
      {parts.map((part, index) => (
        <React.Fragment key={part}>
          {index !== parts.length - 1 ? (
            <>
              <div className={s.breadcrumbs_item}>
                <Link
                  to={`/${parts.slice(0, index + 1).join("/")}`}
                  onClick={() => {
                    dispatch(setSubCategoryProducts([]));
                    dispatch(setCategoryProducts([]));
                    fetchProductsByCategory(props.selectedProduct.category);
                    localStorage.setItem("category", props.selectedProduct.category);
                    // localStorage.removeItem("subcategory");
                  }}
                >
                  {BREADCRUMB_TEXTS[part]}
                </Link>
              </div>
              <div> {">"} </div>
            </>
          ) : (
            <div className={s.breadcrumbs_item}>{BREADCRUMB_TEXTS[part]}</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

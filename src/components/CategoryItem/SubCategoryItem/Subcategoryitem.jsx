import style from "./Subcategoryitem.module.scss";
import { Link } from "react-router-dom";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import axios from "axios";
import {
  setSubCategoryProducts,
  setCategoryProducts,
  setLoading,
} from "../../../redux/features/productsSlice";
import { useDispatch } from "react-redux";

const baseUrl = process.env.REACT_APP_BASE_URL;

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name), "-").toLowerCase();
};

const Subcategoryitem = (props) => {
  const {state} = props;
  const dispatch = useDispatch();

  const fetchProductsBySubCategory = async (title) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `${baseUrl}/product/?subcategory=${title}`
      );
      dispatch(setLoading(false));
      dispatch(setSubCategoryProducts(response.data.products));
    } catch (error) {
      console.error("Error:", error.message);
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className={style.menu__subContent}
      style={{ top: `${props.catPosition}px` }}
      onMouseLeave={(e) => {
        state(false);
      }}
      // onBlur={() => {
      //   console.log("Triggered because this input lost focus");
      // }}
    >
      <div>
        {props.subcategories.map(({ id, title }) => (
          <Link
            key={id}
            id={id}
            className={style.menu__content__link}
            // to={`${props.categoryLink}/${translit(title)}`}
            // to={`/${translit(title)}`}
            to={`/category`}
            onClick={() => {
              dispatch(setSubCategoryProducts([]));
              dispatch(setCategoryProducts([]));
              fetchProductsBySubCategory(title);
              localStorage.setItem("subcategory", title);
              localStorage.removeItem("category");
            }}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subcategoryitem;

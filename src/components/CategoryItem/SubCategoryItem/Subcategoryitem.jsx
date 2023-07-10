import style from "./Subcategoryitem.module.scss";
import { Link } from "react-router-dom";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import axios from "axios";
import { setSubCategoryProducts } from "../../../redux/features/productsSlice";
import { useDispatch } from "react-redux";

const baseUrl = process.env.REACT_APP_BASE_URL;

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name), "-").toLowerCase();
};

const Subcategoryitem = (props) => {
  // const [isActive, setIsActive] = useState(false);
  // const dispatch = useDispatch();

  //   if (isActive) {
  //     dispatch(changeSumMenuState(true))
  //   }
  //   else {
  //     dispatch(changeSumMenuState(false))
  //   }

    const dispatch = useDispatch();

  const fetchProductsBySubCategory = async (title) => {
    try {
      const response = await axios.get(
        `${baseUrl}/product/?subcategory=${title}`
      );
      dispatch(setSubCategoryProducts(response.data.products));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div
      className={style.menu__subContent}
      style={{ top: `${props.catPosition}px` }}
      // onMouseEnter={(e) => {
      //   setIsActive(true);
      // }}
      onBlur={() => {
        console.log("Triggered because this input lost focus");
      }}
    >
      <div>
        {props.subCategory.map(({ id, title }) => (
          <Link
            key={id}
            id={id}
            className={style.menu__content__link}
            // to={`${props.categoryLink}/${translit(title)}`}
            // to={`/${translit(title)}`}
            to={`/category`}
            onClick={() => {
              dispatch(setSubCategoryProducts([]));
              fetchProductsBySubCategory(title)
              localStorage.setItem('subcategory', title)
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

import style from "./Subcategoryitem.module.scss";
import { Link } from "react-router-dom";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import axios from "axios";

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

  const fetchProductsBySubCategory = async (title) => {
    console.log(title);
    try {
      const response = await axios.get(`${baseUrl}/product/?subcategory=${title}`);
      console.log(response.data);
      // dispatch(setAllProducts(response.data.products));
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
            to={`product/${translit(title)}`}
            onClick={() => fetchProductsBySubCategory(title)}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subcategoryitem;

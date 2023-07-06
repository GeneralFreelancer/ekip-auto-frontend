import style from "./Subcategoryitem.module.scss";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import CyrillicToTranslit from "cyrillic-to-translit-js";
// import { useDispatch } from "react-redux";
// import { changeSumMenuState } from "../../../redux/features/subMenu";

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
            to={`${props.categoryLink}/${translit(title)}`}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subcategoryitem;

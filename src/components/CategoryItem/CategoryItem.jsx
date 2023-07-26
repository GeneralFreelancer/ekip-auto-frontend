import s from "./Category.module.scss";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Subcategoryitem from "./SubCategoryItem";
import axios from "axios";
import {
  setCategoryProducts,
  setSubCategoryProducts,
  setLoading,
} from "../../redux/features/productsSlice";
import { useDispatch } from "react-redux";

const baseUrl = process.env.REACT_APP_BASE_URL;
const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit
  .transform(String(name).replace(",", ""), "-")
  .toLowerCase();
};

const CategoryItem = (props) => {
  
  const element = useRef(null);
  const arrOfCategoryes = useRef(null);
  
  const [isActive, setIsSubCat] = useState(false);
  const [catId, setCatId] = useState(false);
  const [categoryLink, setCategoryLink] = useState(false);
  const [catPosition, setCatPosition] = useState("");
  const [mouseDirection, setMouseDirection] = useState(false);
  const [previousPosition, setPreviousPosition] = useState(null);
  const [isCategoryes, setIsCategoryes] = useState([]);
  
  useEffect(() => {
    let arr = [];
    arrOfCategoryes.current.childNodes.forEach((item) => {
      arr.push(item.id)
    })
    setIsCategoryes(arr)
  }, [])

  const dispatch = useDispatch();
  const handleMouseMove = (event) => {
    const currentPosition = event.clientY;
    if (previousPosition && previousPosition > currentPosition) {
      setMouseDirection(false);
    } else if (previousPosition && previousPosition < currentPosition) {
      setMouseDirection(true);
    }
    setPreviousPosition(currentPosition);
  };

  const currentHeight = (elem) => {
    const elementId = elem.target.id;
    const elementIndex = isCategoryes.indexOf(elementId);
    console.log('elementIndex ', elementIndex)
    console.log(elem.clientY);
    if (!mouseDirection) {
      setCatPosition(elem.clientY - 73 - 40);
    } else {
      setCatPosition(elem.clientY - 73);
    }
  };

  const fetchProductsByCategory = async (title) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${baseUrl}/product/?category=${title}`);
      dispatch(setLoading(false));
      dispatch(setCategoryProducts(response.data.products));
    } catch (error) {
      console.error("Error:", error.message);
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className={
        props.styleItem
          ? `${s.menu__wrapper} ${s[`${props.styleItem}`]}`
          : s.menu__wrapper
      }
    >
      <div ref={arrOfCategoryes} className={s.menu__content} onMouseMove={handleMouseMove}>
        {props.data.map(({ id, category, subcategories }, i) => (
          <Link
            key={id}
            id={id}
            ref={element}
            className={
              isActive && id === catId
                ? `${s.menu__content__link} ${s.activeCategory}`
                : s.menu__content__link
            }
            // to={`/${translit(title)}`}
            to={`/category`}
            onMouseEnter={(e) => {
              if (subcategories?.length > 0) {
                console.log('menu target ',id, e.target)
                setIsSubCat(true);
                setCatId(id);
                setCategoryLink(`/${translit(category)}`);
              } else {
                if (id !== catId) {
                  setIsSubCat(false);
                  setCategoryLink(false);
                }
              }
              currentHeight(e);
            }}
            onClick={() => {
              dispatch(setCategoryProducts([]));
              dispatch(setSubCategoryProducts([]));
              fetchProductsByCategory(category);
              localStorage.setItem("category", category);
              localStorage.removeItem("subcategory");
            }}
          >
            {category}
          </Link>
        ))}
      </div>
      {isActive &&
        props.data.map(({ id, subcategories }) =>
        subcategories.length > 0 && id === catId ? (
            <Subcategoryitem
              key={id}
              catPosition={catPosition}
              subcategories={subcategories}
              categoryLink={categoryLink}
              state={setIsSubCat}
            />
          ) : (
            ""
          )
        )}
    </div>
  );
};

export default CategoryItem;

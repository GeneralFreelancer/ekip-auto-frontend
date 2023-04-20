import style from "./Category.module.scss";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name), "-").toLowerCase();
};

const CategoryItem = (props) => {
  const [catId, setCatId] = useState(false);
  const [show, setShow] = useState(false);
  const setStyle = (status) => {  
    if (status) {
        return style.menu__content__show_sub;
      } else {
        return style.menu__content;
      }
  };
  
  // console.log(`${style[`${props.styleItem}`]}` )
  
  return (
    <div className={props.styleItem ?
      `${setStyle(show)} ${style[`${props.styleItem}`]}` :
      setStyle(show)}>
      <div>
        {props.data.map(({ id, title, subCategory }) => (
          <Link
            key={id+1}
            id={id}
            className={style.menu__content__link}
            to={`/${translit(title)}`}
            onMouseEnter={() => {
              if (subCategory.length !== 0) {
                setCatId(id);
                setShow(true);
              }
              if (subCategory.length === 0) {
                setCatId(id);
                setShow(false)
              }
            }}
          >
              {title}
              {subCategory.length > 0 ? (
                <div className={style.menu__subContent}>
                  <div>
                    {subCategory.map(({ id, title }) => (
                      <Link
                        key={id+1}
                        id={id}
                        className={style.menu__content__link}
                        to={`/${translit(title)}`}
                      >
                        {title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                " "
              )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryItem;

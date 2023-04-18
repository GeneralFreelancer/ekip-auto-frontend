import style from "./Category.module.scss";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import React, { useState } from "react";

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name), "-").toLowerCase();
};

const CategoryItem = (props) => {
  const [catId, setCatId] = useState(false);
  const [show, setShow] = useState(false);
  const {styleSidebar} = props;
  
  const setStyle = (status) => {  
    if (status) {
        return style.menu__content__show_sub;
      } else {
        return style.menu__content;
      }
  };
  console.log(props.styleSidebar);
  return (
    <div className={`${setStyle(show)} ${style[styleSidebar]}`} style={props.active ? {display: 'block'} : {display: 'none'}}>
      <ul>
        {props.data.map(({ id, title, subCategory }) => (
          <a
            id={id}
            className={style.menu__content__link}
            href={`/${translit(title)}`}
            onMouseEnter={() => {
              console.log(catId)
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
            <li>
              {title}
              {subCategory.length > 0 ? (
                <div className={style.menu__subContent}>
                  <ul>
                    {subCategory.map(({ id, title }) => (
                      <a
                        id={id}
                        className={style.menu__content__link}
                        href={`/${translit(title)}`}
                      >
                        <li>{title}</li>
                      </a>
                    ))}
                  </ul>
                </div>
              ) : (
                " "
              )}
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default CategoryItem;

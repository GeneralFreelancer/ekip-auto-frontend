import s from "./Category.module.scss";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Subcategoryitem from "./SubCategoryItem";

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name), "-").toLowerCase();
};

const CategoryItem = (props) => {
  const [isActive, setIsSubCat] = useState(false);
  const [catId, setCatId] = useState(false);
  const [categoryLink, setCategoryLink] = useState(false);
  return (
    <div className={props.styleItem ? `${s.menu__wrapper} ${s[`${props.styleItem}`]}`: s.menu__wrapper}>
      <div 
        className={s.menu__content}>
          {props.data.map(({ id, title, subCategory}, i) => ( 
            <Link
              key={id+1}
              id={id}
              className={isActive && id === catId ? `${s.menu__content__link} ${s.activeCategory}` : s.menu__content__link}
              to={`/${translit(title)}`}
              onMouseEnter={() => {
                if (subCategory.length > 0) {
                  setIsSubCat(true);
                  setCatId(id);
                  setCategoryLink(`${translit(title)}`); 
                }
                else {
                  if (id !== catId) {
                    setIsSubCat(false);
                    setCategoryLink(false);
                  }
                }
              }}
              >
                {title}
            </Link>
          ))}
      </div>
          {isActive && props.data.map(({id, subCategory}) => (subCategory.length > 0 && id === catId ? <Subcategoryitem subCategory={subCategory} categoryLink={categoryLink}/> : '')) }
    </div>
    
  );
};

export default CategoryItem;

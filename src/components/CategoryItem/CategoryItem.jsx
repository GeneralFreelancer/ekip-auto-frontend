import s from "./Category.module.scss";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Subcategoryitem from "./SubCategoryItem";


const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name).replace(',', ''), "-").toLowerCase();
};

const CategoryItem = (props) => {
  const [isActive, setIsSubCat] = useState(false);
  const [catId, setCatId] = useState(false);
  const [categoryLink, setCategoryLink] = useState(false);
  const [catPosition, setCatPosition] = useState('');
  const [mouseDirection, setMouseDirection] = useState(false);
  const [previousPosition, setPreviousPosition] = useState(null);
  // const subMenuState = useSelector(selectedState);
  

  const handleMouseMove = (event) => {
    const currentPosition = event.clientY;
    if (previousPosition && previousPosition > currentPosition) {
      setMouseDirection(false)
    } else if (previousPosition && previousPosition < currentPosition) {
      setMouseDirection(true)
    }
    setPreviousPosition(currentPosition);
  };

  const currentHeight = (elem) => { 
    if (!mouseDirection) {
      setCatPosition(elem.clientY - 73 - 40);  
    } else {
      setCatPosition(elem.clientY - 73);
    }
  }
  
  return (
    <div className={props.styleItem ? `${s.menu__wrapper} ${s[`${props.styleItem}`]}`: s.menu__wrapper}  
    >
      <div 
        className={s.menu__content} onMouseMove={handleMouseMove}>
          {props.data.map(({ id, title, subCategory}, i) => ( 
            <Link
              key={`${title}_${id}`}
              id={id}
              className={isActive && id === catId ? `${s.menu__content__link} ${s.activeCategory}` : s.menu__content__link}
              to={`/${translit(title)}`}
              onMouseEnter={(e) => {
                if (subCategory.length > 0) {
                  setIsSubCat(true);
                  setCatId(id);
                  setCategoryLink(`${translit(title)}`); 
                }
                else {
                  if ( id !== catId ) {
                    setIsSubCat(false);
                    setCategoryLink(false);
                  }
                }
                currentHeight(e)
              }}
              >
                {title}
            </Link>
          ))}
      </div>
          {isActive && props.data.map(({id, subCategory}) => (subCategory.length > 0 && id === catId ? <Subcategoryitem  catPosition={catPosition} subCategory={subCategory} categoryLink={categoryLink}/> : ''))}
    </div>
    
  );
};

export default CategoryItem;

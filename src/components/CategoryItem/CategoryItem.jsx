import React, {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import Subcategoryitem from './SubCategoryItem';
import {ReactComponent as DownArrow} from '../../assets/svg/downArrow.svg';
import {ReactComponent as Dot} from '../../assets/svg/dot-big.svg';
import {ReactComponent as Minus} from '../../assets/svg/minus-big.svg';
import {useDispatch} from 'react-redux';
import {
  setCategoryProducts,
  setSubCategoryProducts,
  setLoading,
} from '../../redux/features/productsSlice';
import axios from 'axios';
import CyrillicToTranslit from 'cyrillic-to-translit-js';

import s from './Category.module.scss';

const baseUrl = process.env.REACT_APP_BASE_URL;
const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit
    .transform(String(name).replace(',', ''), '-')
    .toLowerCase();
};

const CategoryItem = (props) => {
  const [isActive, setIsActive] = useState(isActiveData());
  const [catId, setCatId] = useState(false);
  const [categoryLink, setCategoryLink] = useState(false);

  const dispatch = useDispatch();
  const scrolableElement = useRef(null);

  function isActiveData() {
    const itemsWithSubCat = props.data.filter(
      (item) => item.subcategories.length !== 0,
    );

    let isActiveData = {};
    itemsWithSubCat.forEach((item) => {
      isActiveData[item.id] = false;
    });

    return isActiveData;
  }

  const fetchProductsByCategory = async (title) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${baseUrl}/product/?category=${title}`);
      dispatch(setLoading(false));
      dispatch(setCategoryProducts(response.data.products));
    } catch (error) {
      console.error('Error:', error.message);
      dispatch(setLoading(false));
    }
  };

  const handleToggleIsActive = (id) => {
    let isActiveClosedAll = isActive;

    setIsActive({...isActiveClosedAll, [id]: !isActive[id]});
  };

  function scrollToAnchor() {
    if (scrolableElement) {
      let scrollTopPrev = 0;
      let scrollTopCurrent = scrolableElement.current.scrollTop;

      const timerId = setTimeout(() => {
        const intervalId = setInterval(() => {
          scrollTopPrev = scrolableElement.current.scrollTop;
          scrolableElement.current.scrollTop += 4;
          scrollTopCurrent = scrolableElement.current.scrollTop;

          if (scrollTopPrev === scrollTopCurrent) {
            clearInterval(intervalId);
            clearTimeout(timerId);
          }
        }, 20);
      }, 500);
    }
  }

  return (
    <div
      className={
        props.styleItem
          ? `${s.menu__wrapper} ${s[`${props.styleItem}`]}`
          : s.menu__wrapper
      }>
      <div className={s.menu__content} ref={scrolableElement}>
        {props.data.map(({id, category, subcategories}, i) => (
          <>
            <div key={id} className={s.linkContainer}>
              <div
                className={
                  isActive[id]
                    ? `${s.openSubmenu} ${s.openSubmenuOpened}`
                    : s.openSubmenu
                }
                onClick={(e) => {
                  if (subcategories.length > 0) {
                    handleToggleIsActive(id);
                    setCatId(id);
                    setCategoryLink(`${translit(category)}`);
                    if (i === props.data.length - 1) {
                      scrollToAnchor();
                    }
                  } else {
                    if (id !== catId) {
                      setCategoryLink(false);
                    }
                  }
                }}>
                {subcategories.length === 0 ? (
                  <Dot />
                ) : isActive[id] ? (
                  <Minus />
                ) : (
                  <DownArrow />
                )}
              </div>
              <Link
                id={id}
                className={s.menu__content__link}
                to={`/${translit(category)}`}
                onClick={() => {
                  dispatch(setCategoryProducts([]));
                  dispatch(setSubCategoryProducts([]));
                  fetchProductsByCategory(category);
                  localStorage.setItem('category', category);
                  localStorage.removeItem('subcategory');
                }}>
                {category}
              </Link>
            </div>
            <Subcategoryitem
              key={id + i}
              isActive={isActive[id]}
              category={category}
              subcategories={subcategories}
              categoryLink={categoryLink}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default CategoryItem;

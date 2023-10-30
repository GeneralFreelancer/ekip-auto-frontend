import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import axios from 'axios';
import {
  setSubCategoryProducts,
  setCategoryProducts,
  setLoading,
} from '../../../redux/features/productsSlice';
import {useDispatch} from 'react-redux';
import style from './Subcategoryitem.module.scss';

const baseUrl = process.env.REACT_APP_BASE_URL;

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name), '-').toLowerCase();
};

const Subcategoryitem = (props) => {
  const [maxHeight, setMaxHeight] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const openTimerId = setInterval(() => {
      if (props.isActive && maxHeight < 400) {
        setMaxHeight(maxHeight + 8);
      } else {
        clearInterval(openTimerId);
      }
    }, 10);

    const closeTimerId = setInterval(() => {
      if (!props.isActive && maxHeight > 0) {
        setMaxHeight(maxHeight - 8);
      } else {
        clearInterval(closeTimerId);
      }
    }, 10);

    return () => {
      clearInterval(openTimerId);
      clearInterval(closeTimerId);
    };
  }, [maxHeight, props.isActive]);

  const fetchProductsBySubCategory = async (title) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `${baseUrl}/product/?subcategory=${title}`,
      );
      dispatch(setLoading(false));
      dispatch(setSubCategoryProducts(response.data.products));
    } catch (error) {
      console.error('Error:', error.message);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={style.subContent} style={{maxHeight: `${maxHeight}px`}}>
      {props.subcategories.map(({id, title}, i) => (
        <div
          key={id}
          id={i === props.subcategories.length - 1 ? `${id}` : null}
          className={style.subContentItemContainer}>
          <div className={style.subContentDevider}></div>
          <Link
            id={id}
            className={style.menu__content__link}
            to={`/${props.categoryLink}/${translit(title)}`}
            onClick={() => {
              dispatch(setSubCategoryProducts([]));
              dispatch(setCategoryProducts([]));
              fetchProductsBySubCategory(title);
              localStorage.setItem('subcategory', title);
              localStorage.removeItem('category');
            }}>
            {title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Subcategoryitem;

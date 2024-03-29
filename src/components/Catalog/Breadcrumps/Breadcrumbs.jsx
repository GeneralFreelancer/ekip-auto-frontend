import React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import s from './Breadcrumbs.module.scss';
import {
  setSubCategoryProducts,
  setCategoryProducts,
} from '../../../redux/features/productsSlice';
import {useDispatch} from 'react-redux';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Breadcrumbs = (props) => {
  const {pathname} = useLocation();
  const dispatch = useDispatch();

  const isId = (id) => {
    let isId = false;

    for (let letter of id) {
      if (!isNaN(Number(letter))) {
        isId = true;
      }
    }
    return isId;
  };

  const specialCategoryIdentifier = (splitedPathname) => {
    if (
      splitedPathname[splitedPathname.length - 1] === 'ostannі-nadkhodzhennya'
    ) {
      return 'Останні надходження';
    }

    if (splitedPathname[splitedPathname.length - 1] === 'top-prodazhu') {
      return 'Топ продажу';
    }

    if (
      splitedPathname[splitedPathname.length - 1] === 'ostannі-pereglyanutі'
    ) {
      return 'Останні переглянуті';
    }

    if (
      splitedPathname[splitedPathname.length - 1] === 'vas-mozhe-zatsіkaviti'
    ) {
      return 'Вас може зацікавити';
    }

    return null;
  };

  const pathNameSpleted = decodeURI(pathname).split('/');
  const parts =
    pathNameSpleted.length === 4
      ? ['category', 'subcategory', 'name']
      : pathNameSpleted.length === 3 &&
        !isId(pathNameSpleted[pathNameSpleted.length - 1])
      ? ['category', 'subcategory']
      : pathNameSpleted.length <= 3 &&
        isId(pathNameSpleted[pathNameSpleted.length - 1])
      ? ['category', 'name']
      : ['category']; // mocked

  const BREADCRUMB_TEXTS = {
    category: specialCategoryIdentifier(pathNameSpleted)
      ? specialCategoryIdentifier(pathNameSpleted)
      : props.selectedProduct.category,
    subcategory: props.selectedProduct.subCategory,
    name: trimString(props.selectedProduct.name),
  };

  const breadcrumbsStyles = props.absolute
    ? {position: 'absolute', top: 0, left: 0}
    : {};
  const paddingTop = props.paddingTop ? {paddingTop: '15px'} : {};

  const fetchProductsByCategory = async (title) => {
    try {
      const response = await axios.get(`${baseUrl}/product/?category=${title}`);
      dispatch(setCategoryProducts(response.data.products));
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  function trimString(str) {
    if (str.length > 20) {
      return str.slice(0, 20) + '...';
    } else {
      return str;
    }
  }

  return (
    <div
      className={s.breadcrumbs_block}
      style={{...breadcrumbsStyles, ...paddingTop}}>
      {parts.length > 0 && (
        <React.Fragment key={0}>
          <div className={s.breadcrumbs_item}>
            <Link to="/">Головна</Link>
          </div>
          <div>{' > '}</div>
        </React.Fragment>
      )}
      {parts.map((part, index) => (
        <React.Fragment key={part}>
          {index !== parts.length - 1 ? (
            <>
              <div className={s.breadcrumbs_item}>
                <Link
                  to={`/${parts.slice(0, index + 1).join('/')}`}
                  onClick={() => {
                    dispatch(setSubCategoryProducts([]));
                    dispatch(setCategoryProducts([]));
                    fetchProductsByCategory(props.selectedProduct.category);
                    localStorage.setItem(
                      'category',
                      props.selectedProduct.category,
                    );
                  }}>
                  {BREADCRUMB_TEXTS[part]}
                </Link>
              </div>
              <div> {'>'} </div>
            </>
          ) : (
            <div className={s.breadcrumbs_item}>{BREADCRUMB_TEXTS[part]}</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

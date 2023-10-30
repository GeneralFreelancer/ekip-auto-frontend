import React, {useState, useRef} from 'react';
import {NavLink} from 'react-router-dom';
import './Accordion.scss';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import {ReactComponent as ArrowDown} from '../../../../../assets/svg/up-arrow.svg';
import axios from 'axios';
import {
  setCategoryProducts,
  setSubCategoryProducts,
  selectLoading,
  selectCategoryNames,
  setLoading,
} from '../../../../../redux/features/productsSlice';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

const baseUrl = process.env.REACT_APP_BASE_URL;

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name), '-').toLowerCase();
};

const AccordionItem = (props) => {
  const contentEl = useRef();
  const {handleToggle, active, item} = props;
  const {id, category, subcategories} = item;

  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);

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
    <div className="rc-accordion-card">
      {subcategories?.length === 0 ? (
        <NavLink
          to={`/category`}
          onClick={() => {
            props.onClick();
            dispatch(setCategoryProducts([]));
            dispatch(setSubCategoryProducts([]));
            fetchProductsByCategory(category);
            localStorage.setItem('category', category);
            localStorage.removeItem('subcategory');
          }}>
          <div className="rc-accordion-title single">{category}</div>
        </NavLink>
      ) : (
        <div
          className={`rc-accordion-toggle p-3 ${active === id ? 'active' : ''}`}
          onClick={(e) => handleToggle(id, e)}>
          <NavLink
            to={`/category`}
            className="rc-accordion-title"
            onClick={() => {
              props.onClick();
              dispatch(setCategoryProducts([]));
              dispatch(setSubCategoryProducts([]));
              fetchProductsByCategory(category);
              localStorage.setItem('category', category);
              localStorage.removeItem('subcategory');
            }}>
            {category}
          </NavLink>

          <ArrowDown className="arrow-down" />
        </div>
      )}

      {subcategories?.length > 0 && (
        <div
          ref={contentEl}
          className={`rc-collapse ${active === id ? 'show' : ''}`}
          style={
            active === id
              ? {height: contentEl.current.scrollHeight}
              : {height: '0px'}
          }>
          <div className="rc-accordion-body">
            {subcategories &&
              subcategories.map((sub) => {
                return (
                  <NavLink
                    to={`/category`}
                    onClick={() => {
                      props.onClick();
                      dispatch(setSubCategoryProducts([]));
                      dispatch(setCategoryProducts([]));
                      fetchProductsBySubCategory(sub.title);
                      localStorage.setItem('subcategory', sub.title);
                      localStorage.removeItem('category');
                    }}
                    id={sub.id}
                    key={sub.id}>
                    <div className="rc-accordion-body-title"> {sub.title}</div>
                  </NavLink>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

const Accordion = (props) => {
  const [active, setActive] = useState(null);

  const categoryNames = useSelector(selectCategoryNames);

  const handleToggle = (index, e) => {
    if (e.target.localName === 'div' || e.target.localName === 'svg') {
      if (active === index) {
        setActive(null);
      } else {
        setActive(index);
      }
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          {categoryNames.map((item, index) => {
            return (
              <AccordionItem
                key={index}
                active={active}
                handleToggle={handleToggle}
                item={item}
                onClick={props.onClick}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Accordion;

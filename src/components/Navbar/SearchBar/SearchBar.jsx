import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {ReactComponent as Search} from '../../../assets/magnifying-glass.svg';
import {ReactComponent as Cross} from '../../../assets/svg/cross.svg';
import {setOneProduct} from '../../../redux/features/productsSlice';
import axios from 'axios';
import s from './SearchBar.module.scss';

const baseUrl = process.env.REACT_APP_BASE_URL;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Example of search results cards array
  // const products = [
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     article: "Art: SU A001",
  //     src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
  //     priceUAH: "5000",
  //     priceUSD: "500",
  //   },
  // ];

  useEffect(() => {
    const getProductsBySearch = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/product/?search=${searchQuery}`,
        );
        setSearchItems(response.data.products);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    if (searchQuery !== '') {
      getProductsBySearch();
    } else {
      setSearchItems([]);
    }
  }, [searchQuery]);
  // console.log('Search query: ', searchQuery);
  const wrapperSearchBarRef = useRef(null);
  useEffect(() => {
    const handleClickWindow = (e) => {
      if (showResults === true) {
        if (
          wrapperSearchBarRef.current &&
          !wrapperSearchBarRef.current.contains(e.target) &&
          searchQuery === ''
        ) {
          setIsFocused(false);
          setShowResults(false);
          setSearchQuery('');
          setSearchItems([]);
        }
      }
    };

    if (showResults === true) {
      window.addEventListener('click', handleClickWindow);
    } else {
      window.removeEventListener('click', handleClickWindow);
    }

    if (localStorage.getItem('search') && searchQuery === '') {
      setSearchQuery(localStorage.getItem('search'));
    }

    return () => {
      window.removeEventListener('click', handleClickWindow);
    };
  }, [showResults, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery((prevState) => {
      if (prevState.length >= 1) {
        localStorage.removeItem('search');
      }
      return e.target.value;
    });
    setShowResults(true);
  };

  const handleBlur = () => {
    if (searchQuery === '') {
      const newTimerId = setTimeout(() => {
        setIsFocused(false);
        setShowResults(false);
        setSearchItems([]);
      }, 1000000000000000);
      setTimerId(newTimerId);
    }
    if (searchQuery !== '') {
      localStorage.setItem('search', searchQuery);
    }
  };

  const handleFocus = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
    setIsFocused(true);
  };

  const handleItemClick = (id) => {
    console.log('click item', id);
    dispatch(setOneProduct({}));
    navigate(`/${id}`);
    setShowResults(false);
  };

  const handleCrossClick = (e) => {
    e.preventDefault();
    setShowResults(false);
    setSearchItems([]);
    setSearchQuery('');
    localStorage.removeItem('search');
  };

  function trimString(str) {
    if (str.length > 20) {
      return str.slice(0, 20) + '...';
    } else {
      return str;
    }
  }

  return (
    <div className={s.search_block} ref={wrapperSearchBarRef}>
      <Search className={`${s.search_img} ${isFocused ? s.hidden : ''}`} />
      <input
        className={`${s.input_block} ${isFocused ? s.input_block_wide : ''}`}
        placeholder="Пошук..."
        value={searchQuery}
        onChange={handleSearch}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <div
        className={s.search_cross_container}
        style={isFocused ? {} : {display: 'none'}}
        onClick={(e) => handleCrossClick(e)}>
        <Cross className={`${s.search_cross} ${isFocused ? '' : s.hidden}`} />
      </div>
      {showResults && (
        <div className={s.search_results}>
          {searchItems.length > 0 ? (
            searchItems.map((item) => (
              <div
                key={item.id}
                className={s.search_item}
                onClick={() => handleItemClick(item.id)}>
                <div className={s.search_item_block}>
                  <div className={s.search_item_image}>
                    <img src={item.pictures[0]} alt="img" />
                  </div>
                  <div>
                    <p>{trimString(item.name)}</p>
                    <p>
                      <span>{item.sku}</span>
                    </p>
                  </div>
                </div>

                <div className={s.price_wrapper}>
                  <p>{item.priceUAH} UAH</p>
                  <p>{item.priceUSD} USD</p>
                </div>
              </div>
            ))
          ) : (
            <div className={s.search_item}>Не знайдено</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

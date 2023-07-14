import React, { useState, useMemo, useEffect, useRef } from "react";
import s from "./SearchBar.module.scss";
import { ReactComponent as Search } from "../../../assets/magnifying-glass.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOneProduct } from "../../../redux/features/productsSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  
  // const products = [
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     article: "Art: SU A001",
  //     src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
  //     priceUAH: "5000",
  //     priceUSD: "500",
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     article: "Art: SU B002",
  //     src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
  //     priceUAH: "5000",
  //     priceUSD: "500",
  //   },
  //   {
  //     id: 3,
  //     name: "Product 3",
  //     article: "Art: SU C003",
  //     src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
  //     priceUAH: "5000",
  //     priceUSD: "500",
  //   },
  //   {
  //     id: 4,
  //     name: "Product 4",
  //     article: "Art: SU D004",
  //     src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
  //     priceUAH: "5000",
  //     priceUSD: "500",
  //   },
  //   {
  //     id: 5,
  //     name: "Product 5",
  //     article: "Art: SU E005",
  //     src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
  //     priceUAH: "5000",
  //     priceUSD: "500",
  //   },
  //   {
  //     id: 6,
  //     name: "Product 6",
  //     article: "Art: SU F006",
  //     src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
  //     priceUAH: "5000",
  //     priceUSD: "500",
  //   },
  //   {
  //     id: 7,
  //     name: "Product 7",
  //     article: "Art: SU G007",
  //     src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
  //     priceUAH: "5000",
  //     priceUSD: "500",
  //   },
  // ];

  useEffect(() => {
    const getProductsBySearch = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product/?search=${searchQuery}`);
        setSearchItems(response.data.products);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    if (searchQuery !== '') {
      getProductsBySearch();
    } 
    else {
      setSearchItems([])
    }
  }, [searchQuery]);

  const wrapperSearchBarRef = useRef(null);

  useEffect(() => {
    const handleClickWindow = (e) => {
      if (showResults === true) {
        if (
          wrapperSearchBarRef.current &&
          !wrapperSearchBarRef.current.contains(e.target)
        ) {
          setIsFocused(false);
          setShowResults(false);
          setSearchQuery("");
          setSearchItems([]);
        }
      }
    };
    if (showResults === true) {
      window.addEventListener("click", handleClickWindow);
    } else {
      window.removeEventListener("click", handleClickWindow);
    }
    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, [showResults]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
    // setSearchItems(products);
  };

  const handleBlur = () => {
    if (showResults === false) {
      setIsFocused(false);
    }

    const newTimerId = setTimeout(() => {
      setIsFocused(false);
      setShowResults(false);
      setSearchQuery("");
      setSearchItems([]);
    }, 10000);
    setTimerId(newTimerId);
  };

  const handleFocus = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
    setIsFocused(true);
  };

  const handleItemClick = (id) => {
    dispatch(setOneProduct({}));
    navigate(`/${id}`);
    setIsFocused(false);
    setShowResults(false);
    setSearchQuery("");
    setSearchItems([]);
  };

  // const searchedFinalItems = useMemo(() => {
  //   return searchItems?.filter(
  //     (item) =>
  //       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // }, [searchQuery, searchItems]);

  function trimString(str) {
    if (str.length > 20) {
      return str.slice(0, 20) + "...";
    } else {
      return str;
    }
  }

  return (
    <div className={s.search_block} ref={wrapperSearchBarRef}>
      <Search className={`${s.search_img} ${isFocused ? s.hidden : ""}`} />
      <input
        className={`${s.input_block} ${isFocused ? s.input_block_wide : ""}`}
        placeholder="Пошук..."
        value={searchQuery}
        onChange={handleSearch}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {showResults && (
        <div className={s.search_results}>
          {searchItems.length > 0 ? (
            searchItems.map((item) => (
              <div
                key={item.id}
                className={s.search_item}
                onClick={() => handleItemClick(item.id)}
              >
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

                <div style={{textAlign: 'end'}}>
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

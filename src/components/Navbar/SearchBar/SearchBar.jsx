import React, { useState, useMemo, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import s from "./SearchBar.module.scss";
import { ReactComponent as Search } from "../../../assets/magnifying-glass.svg";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const products = [
    {
      id: 1,
      name: "Product 1",
      article: "Art: SU A001",
      src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
      priceUAH: "5000",
      priceUSD: "500",
    },
    {
      id: 2,
      name: "Product 2",
      article: "Art: SU B002",
      src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
      priceUAH: "5000",
      priceUSD: "500",
    },
    {
      id: 3,
      name: "Product 3",
      article: "Art: SU C003",
      src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
      priceUAH: "5000",
      priceUSD: "500",
    },
    {
      id: 4,
      name: "Product 4",
      article: "Art: SU D004",
      src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
      priceUAH: "5000",
      priceUSD: "500",
    },
    {
      id: 5,
      name: "Product 5",
      article: "Art: SU E005",
      src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
      priceUAH: "5000",
      priceUSD: "500",
    },
    {
      id: 6,
      name: "Product 6",
      article: "Art: SU F006",
      src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
      priceUAH: "5000",
      priceUSD: "500",
    },
    {
      id: 7,
      name: "Product 7",
      article: "Art: SU G007",
      src: "https://cdn.27.ua/799/c1/72/1032562_1.jpeg",
      priceUAH: "5000",
      priceUSD: "500",
    },
  ];

  //   async function fetchInfo() {
  //     try {
  //         const response = await axios.get("https://63d121b43f08e4a8ff913936.mockapi.io/user")
  //         setSearchItems(response.data)
  //     } catch (e) {}
  // }

  useEffect(() => {
    setSearchItems(products);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
    setSearchItems(products);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setShowResults(false);
    setSearchQuery("");
    setSearchItems([]);

    setTimeout(() => {
      setIsFocused(false);
      setShowResults(false);
      setSearchQuery("");
      setSearchItems([]);
    }, 10000);
  };

  const handleFocus = () => setIsFocused(true);

  const handleOutsideClick = () => {
    setShowResults(false);
    setSearchQuery("");
    setSearchItems([]);
  };

  const handleItemClick = (id) => {
    console.log(id);
    setShowResults(false);
    setSearchQuery("");
    setSearchItems([]);
  };

  const searchedFinalItems = useMemo(() => {
    return searchItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.article.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, searchItems]);

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <div className={s.search_block}>
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
            {searchedFinalItems.length > 0 ? (
              searchedFinalItems.map((item) => (
                <div
                  key={item.id}
                  className={s.search_item}
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className={s.search_item_block}>
                    <div className={s.search_item_image}>
                      <img src={item.src} alt="img" />
                    </div>
                    <div>
                      <p>{item.name}</p>
                      <p>
                        <span>{item.article}</span>
                      </p>
                    </div>
                  </div>

                  <div>
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
    </OutsideClickHandler>
  );
};

export default SearchBar;

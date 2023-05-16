import s from "./CatalogComponents.module.scss";

import { useEffect, useState } from "react";
import axios from "axios";

import InStock from "./InStock";
import Filter from "./Filter";
import ListCards from "../ListCards";

// import Pagination from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import Pagination from "rc-pagination";
import { ReactComponent as Arrow } from "../../assets/svg/up-arrow.svg";

import "./Pagination/Pagination.scss";

let cardsData = [
  {
    id: 1,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: " Table is very goodTable is very goodLampa is wery good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 2,
    imgUrl:
      "https://w7.pngwing.com/pngs/235/163/png-transparent-ghost-drawing-halloween-ghost-pics-white-marine-mammal-fictional-character.png",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 3,
    imgUrl:
      "https://w.forfun.com/fetch/9d/9db2d4683d92f5f2045e9142fbd82633.jpeg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 4,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 5,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 6,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 7,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 8,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/LetterG.svg/800px-LetterG.svg.png",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 9,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 10,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 11,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 12,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 13,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: " Table is very goodTable is very goodLampa is wery good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 14,
    imgUrl:
      "https://w7.pngwing.com/pngs/235/163/png-transparent-ghost-drawing-halloween-ghost-pics-white-marine-mammal-fictional-character.png",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 15,
    imgUrl:
      "https://w.forfun.com/fetch/9d/9db2d4683d92f5f2045e9142fbd82633.jpeg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 16,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 17,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 18,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 19,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 20,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/LetterG.svg/800px-LetterG.svg.png",
    title: "Table is very good",
    priceUAH: "5",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 21,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "10000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 22,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },

  {
    id: 23,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: " Table is very goodTable is very goodLampa is wery good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 24,
    imgUrl:
      "https://w7.pngwing.com/pngs/235/163/png-transparent-ghost-drawing-halloween-ghost-pics-white-marine-mammal-fictional-character.png",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 25,
    imgUrl:
      "https://w.forfun.com/fetch/9d/9db2d4683d92f5f2045e9142fbd82633.jpeg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 26,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 27,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 28,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 29,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 30,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/LetterG.svg/800px-LetterG.svg.png",
    title: "Table is very good",
    priceUAH: "5",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 31,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "10000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 32,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Table is very good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
];

const CatalogComponents = () => {
  const [filter, setFilter] = useState("new");
  const [inStock, setInStock] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);

  const [perPage, setPerPage] = useState(10);
  const [current, setCurrent] = useState(1);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const changeCardsQuantity = (width) => {
    if (width > 1575) {
      setPerPage(36);
    }
    if (width <= 1575) {
      setPerPage(25);
    }
    if (width <= 1350) {
      setPerPage(20);
    }
    if (width <= 1075) {
      setPerPage(18);
    }
    if (width <= 825) {
      setPerPage(12);
    }
    if (width <= 462) {
      setPerPage(10);
    }
  };

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    changeCardsQuantity(viewportWidth);
    setCurrent(1);
  }, [viewportWidth]);

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const category = pathArray[1];
    const subCategory = pathArray.length === 3 && pathArray[2];

    setItems(cardsData);

    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("https://example.com/api/products", {
    //       params: {
    //         category: category,
    //         subCategory: subCategory
    //       }
    //     });
    //     setItems(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchData();
  }, []);

  useEffect(() => {
    let filteredItems;
    filteredItems = items.filter((item) =>
      inStock ? item.inStock === inStock : item
    );

    switch (filter) {
      case "new":
        // filteredItems = [...filteredItems].sort(
        //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        // );
        break;
      case "popular":
        //    filteredItems = [...filteredItems].sort((a, b) => b.popular - a.popular);
        break;
      case "cheap":
        filteredItems = [...filteredItems].sort(
          (a, b) => a.priceUAH - b.priceUAH
        );
        break;
      case "expensive":
        filteredItems = [...filteredItems].sort(
          (a, b) => b.priceUAH - a.priceUAH
        );
        break;
      default:
        break;
    }
    setCurrent(1);
    setFilteredArr(filteredItems);
  }, [filter, inStock, items]);

  const onChangeParams = (name, value) => {
    if (name === "filter") {
      setFilter(value);
    } else {
      setInStock(value);
    }
  };

  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return filteredArr.slice((current - 1) * pageSize, current * pageSize);
  };

  useEffect(() => {
    getData(current, perPage);
  }, [current, perPage]);

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <Arrow className="arrow left" style={{ transform: "rotate(270deg)" }} />
      );
    }
    if (type === "next") {
      return (
        <Arrow className="arrow right" style={{ transform: "rotate(90deg)" }} />
      );
    }
    return originalElement;
  };

  return (
    <section>
      <div className={s.mainWrapper}>
        <div className={s.wrapper}>
          <Filter onChangeParams={onChangeParams} />
          <Pagination
            className="pagination-data"
            onChange={PaginationChange}
            total={filteredArr.length}
            current={current}
            pageSize={perPage}
            showSizeChanger={false}
            itemRender={PrevNextArrow}
          />
          <InStock onChangeParams={onChangeParams} />
        </div>
        <div className={s.wrapperListCards}>
          <ListCards
            showAll={true}
            items={getData(current, perPage)}
            need_A_Slider={false}
          />
        </div>

        <div className="wrapperPaginationInBottom">
          <Pagination
            className="pagination-data"
            onChange={PaginationChange}
            total={filteredArr.length}
            current={current}
            pageSize={perPage}
            showSizeChanger={false}
            itemRender={PrevNextArrow}
          />
        </div>
      </div>
    </section>
  );
};

export default CatalogComponents;

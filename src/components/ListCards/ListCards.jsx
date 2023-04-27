import "react-slideshow-image/dist/styles.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Slide } from "react-slideshow-image";
import "../SideBarSlider/Slider/Slider.scss";

import style from "./ListCards.module.scss";
import Card from "./Card";

import CyrillicToTranslit from "cyrillic-to-translit-js";

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name).replace(',', ''), "-").toLowerCase();
};

const images = [
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];

let cardsData = [
  {
    id: 1,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title:
      " Lampa is wery good lampaLampa is wery good lampaLampa is wery good",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 2,
    imgUrl:
      "https://w7.pngwing.com/pngs/235/163/png-transparent-ghost-drawing-halloween-ghost-pics-white-marine-mammal-fictional-character.png",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 3,
    imgUrl:
      "https://w.forfun.com/fetch/9d/9db2d4683d92f5f2045e9142fbd82633.jpeg",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 4,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 5,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: false,
  },
  {
    id: 6,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 7,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 8,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/LetterG.svg/800px-LetterG.svg.png",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 9,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 10,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 11,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
  {
    id: 12,
    imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    inStock: true,
  },
];

const properties = {
  autoplay: false,
  transitionDuration: 250,
};

const ListCards = ({ title = "Product", showAll = false, link }) => {
  const [cards] = useState(cardsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [lastPage, setLastPage] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const changeCardsQuantity = (width) => {
    if (width > 1575) {
      setCardsPerPage(6);
    }
    if (width <= 1575) {
      setCardsPerPage(5);
    }
    if (width <= 1350) {
      setCardsPerPage(4);
    }
    if (width <= 1075) {
      setCardsPerPage(3);
    }
    if (width <= 825) {
      setCardsPerPage(2);
    }
    // isLastPage();
  };

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    // handleResize();
    // changeCardsQuantity(viewportWidth);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    changeCardsQuantity(viewportWidth);
  }, [viewportWidth]);

  // const isLastPage = () => {
  //   const totalPages = Math.ceil(cards.length / cardsPerPage);
  //   if (currentPage === totalPages) {
  //     setLastPage(true);
  //   } else {
  //     setLastPage(false);
  //   }
  // };

  // const handlePageClick = (event) => {
  //   event.preventDefault();
  //   const totalPages = Math.ceil(cards.length / cardsPerPage);
  //   if (currentPage < totalPages) {
  //     setCurrentPage((prevState) => prevState + 1);
  //     if (cards.length / cardsPerPage === currentPage + 1) {
  //       setLastPage(true);
  //     }
  //   } else {
  //     setLastPage(true);
  //   }
  // };

  // const handleCollapseClick = (event) => {
  //   event.preventDefault();
  //   setCurrentPage(1);
  //   setLastPage(false);
  // };

  const renderCards = (showAll) => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const cardsToShow = cards.slice(0, indexOfLastCard);

    if (!showAll) {
      return cardsToShow.map(
        ({ id, imgUrl, title, priceUAH, priseUSD, inStock }, index) => (
          <Card
            key={id}
            id={id}
            imgUrl={imgUrl}
            title={title}
            priceUAH={priceUAH}
            priseUSD={priseUSD}
            inStock={inStock}
            styleCard={(index + 1) % cardsPerPage === 0 && "lastCard"}
          />
        )
      );
    } else {
      return cards.map(
        ({ id, imgUrl, title, priceUAH, priseUSD, inStock }, index) => (
          <Card
            key={id}
            id={id}
            imgUrl={imgUrl}
            title={title}
            priceUAH={priceUAH}
            priseUSD={priseUSD}
            inStock={inStock}
            styleCard={(index + 1) % cardsPerPage === 0 ? "lastCard" : "card"}
          />
        )
      );
    }
  };

  return (
    <>
      {viewportWidth > 578 ? (
        <div className={style.container}>
          <div className={style.cardGrid}>
            {title && <h2 className={style.titleCategory}>{title} :</h2>}

            {renderCards(showAll)}

            {!showAll && (
              <NavLink className={style.buttonMore} to={`/${translit(title)}`}>
                Показати ще...
              </NavLink>
            )}

            {/* {!showAll &&
              (lastPage ? (
                <button
                  className={style.buttonMore}
                  onClick={handleCollapseClick}
                >
                  Згорнути
                </button>
              ) : (
                <button className={style.buttonMore} onClick={handlePageClick}>
                  Показати ще...
                </button>
              ))} */}
          </div>
        </div>
      ) : (
        <>
          <div className="wrapperSlider sliderCard">
            {title && (
              <h2 className={style.titleCategory}>
                 {title} :
              </h2>
            )}
            <Slide {...properties}>
              {cards.map(
                ({ id, imgUrl, title, priceUAH, priseUSD, inStock }, index) => (
                  <Card
                    key={id}
                    id={id}
                    imgUrl={imgUrl}
                    title={title}
                    priceUAH={priceUAH}
                    priseUSD={priseUSD}
                    inStock={inStock}
                    styleCard={"lastCard"}
                  />
                )
              )}
            </Slide>
          </div>
        </>
      )}
    </>
  );
};

export default ListCards;

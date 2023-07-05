import "react-slideshow-image/dist/styles.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "../SideBarSlider/Slider/Slider.scss";
import style from "./ListCards.module.scss";
import Card from "./Card";
import CyrillicToTranslit from "cyrillic-to-translit-js";

// let cardsData = [
//   {
//     id: 1,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title:
//       " Lampa is wery good lampaLampa is wery good lampaLampa is wery good",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 2,
//     imgUrl:
//       "https://w7.pngwing.com/pngs/235/163/png-transparent-ghost-drawing-halloween-ghost-pics-white-marine-mammal-fictional-character.png",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 3,
//     imgUrl:
//       "https://w.forfun.com/fetch/9d/9db2d4683d92f5f2045e9142fbd82633.jpeg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: false,
//   },
//   {
//     id: 4,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: false,
//   },
//   {
//     id: 5,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: false,
//   },
//   {
//     id: 6,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 7,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 8,
//     imgUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/LetterG.svg/800px-LetterG.svg.png",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 9,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 10,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 11,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 12,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 13,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title:
//       " Lampa is wery good lampaLampa is wery good lampaLampa is wery good",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 14,
//     imgUrl:
//       "https://w7.pngwing.com/pngs/235/163/png-transparent-ghost-drawing-halloween-ghost-pics-white-marine-mammal-fictional-character.png",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 15,
//     imgUrl:
//       "https://w.forfun.com/fetch/9d/9db2d4683d92f5f2045e9142fbd82633.jpeg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: false,
//   },
//   {
//     id: 16,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: false,
//   },
//   {
//     id: 17,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: false,
//   },
//   {
//     id: 18,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 19,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 20,
//     imgUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/LetterG.svg/800px-LetterG.svg.png",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 21,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 22,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 23,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
//   {
//     id: 24,
//     imgUrl: "https://sts.sumy.ua/wp-content/uploads/2019/07/tvar.jpg",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     inStock: true,
//   },
// ];

const properties = {
  autoplay: false,
  transitionDuration: 250,
};

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit
    .transform(String(name).replace(",", ""), "-")
    .toLowerCase();
};

const ListCards = ({
  title,
  showAll = false,
  link, // temp variable for backend
  items,
  need_A_Slider = true,
}) => {
  const [cards, setCards] = useState(items);
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
  };

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCards(items);
  }, [items]);

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
    const cardsToShow = cards?.slice(0, indexOfLastCard);

    if (!showAll) {
      return cardsToShow?.map(
        ({ id, pictures, name, priceUAH, priceUSD, stock }, index) => (
          <Card
            key={id}
            id={id}
            imgUrl={pictures[0]}
            name={name}
            priceUAH={priceUAH}
            priceUSD={priceUSD}
            stock={stock}
            styleCard={(index + 1) % cardsPerPage === 0 && "lastCard"}
          />
        )
      );
    } else {
      return cards.map(
        ({ id, pictures, name, priceUAH, priceUSD, stock }, index) => (
          <Card
            key={id}
            id={id}
            imgUrl={pictures[0]}
            name={name}
            priceUAH={priceUAH}
            priceUSD={priceUSD}
            stock={stock}
            styleCard={(index + 1) % cardsPerPage === 0 ? "lastCard" : "card"}
          />
        )
      );
    }
  };
  return (
    <>
      {cards?.length !== 0 ? (
        viewportWidth > 578 ? (
          <div className={style.container}>
            <div className={style.cardGrid}>
              {title && <h2 className={style.titleCategory}>{title} :</h2>}

              {renderCards(showAll)}

              {!showAll && (
                <NavLink
                  className={style.buttonMore}
                  to={`${translit(title)}`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
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
        ) : need_A_Slider ? (
          <div className="wrapperSlider sliderCard">
            {title && (
              <NavLink to={`${translit(title)}`}>
                <h2 className={style.titleCategory}>{title} :</h2>
              </NavLink>
            )}
            <Slide {...properties}>
              {cards.map(
                ({ id, pictures, name, priceUAH, priceUSD, stock }, index) => (
                  <Card
                    key={id}
                    id={id}
                    imgUrl={pictures[0]}
                    name={name}
                    priceUAH={priceUAH}
                    priceUSD={priceUSD}
                    stock={stock}
                    styleCard={"lastCard"}
                  />
                )
              )}
            </Slide>
          </div>
        ) : (
          renderCards(showAll)
        )
      ) : (
        <p className={style.alert}>Товар у данній категорії відсутній</p>
      )}
    </>
  );
};

export default ListCards;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "../Container";

import style from "./ListCards.module.scss";
import Card from "../Card";

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

const ListCards = ({ title = "Product", showAll = false, link }) => {
  const [cards] = useState(cardsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);
  const [lastPage, setLastPage] = useState(false);

  const handlePageClick = (event) => {
    event.preventDefault();
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevState) => prevState + 1);
      if (cards.length / cardsPerPage === currentPage + 1) {
        setLastPage(true);
      }
    } else {
      setLastPage(true);
    }
  };

  const handleCollapseClick = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setLastPage(false);
  };

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
    <section>
      <Container>
        <div className={style.wrapper}>
          <div className={style.cardGrid}>
            {title && (
              <h2 className={style.titleCategory}>
                <NavLink to={link} className={style.link}>
                  {title} :
                </NavLink>
              </h2>
            )}

            {renderCards(showAll)}

            {!showAll &&
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
              ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ListCards;

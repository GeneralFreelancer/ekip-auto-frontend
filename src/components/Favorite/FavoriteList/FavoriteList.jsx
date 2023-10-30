import {useState, useEffect} from 'react';

import s from './FavoriteList.module.scss';
import FavoriteCard from './FavoriteCard';

import CyrillicToTranslit from 'cyrillic-to-translit-js';

const cyrillicToTranslit = new CyrillicToTranslit();
const translit = (name) => {
  return cyrillicToTranslit
    .transform(String(name).replace(',', ''), '-')
    .toLowerCase();
};

const FavoriteList = ({items, handelClick}) => {
  const [cards, setCards] = useState(items);
  const [cardsPerPage, setCardsPerPage] = useState(6);
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCards(items);
  }, [items]);

  useEffect(() => {
    changeCardsQuantity(viewportWidth);
  }, [viewportWidth]);

  const renderCards = () => {
    return cards.map((card, index) => (
      <FavoriteCard key={card.id} card={card} handelClick={handelClick} />
    ));
  };

  return (
    <>
      {cards?.length !== 0 ? (
        <div className={s.container}>
          <div className={s.cardGrid}>{renderCards()}</div>
        </div>
      ) : (
        <h1 className={s.alert}>Ви не додали жодного товару</h1>
      )}
    </>
  );
};

export default FavoriteList;

import 'react-slideshow-image/dist/styles.css';
import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {Slide} from 'react-slideshow-image';
import '../SideBarSlider/Slider/Slider.scss';
import style from './ListCards.module.scss';
import Card from './Card';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import {
  setCategoryProducts,
  setSubCategoryProducts,
} from '../../redux/features/productsSlice';
import {useDispatch} from 'react-redux';

const properties = {
  autoplay: false,
  transitionDuration: 250,
};

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit
    .transform(String(name).replace(',', ''), '-')
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
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();

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

  const renderCards = (showAll) => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const cardsToShow = cards?.slice(0, indexOfLastCard);

    if (!showAll) {
      return cardsToShow?.map(
        ({id, pictures, name, priceUAH, priceUSD, stock}, index) => (
          <Card
            key={id}
            id={id}
            imgUrl={pictures[0]}
            name={name}
            priceUAH={priceUAH}
            priceUSD={priceUSD}
            stock={stock}
            styleCard={(index + 1) % cardsPerPage === 0 && 'lastCard'}
          />
        ),
      );
    } else {
      return cards.map(
        ({id, pictures, name, priceUAH, priceUSD, stock}, index) => (
          <Card
            key={id}
            id={id}
            imgUrl={pictures[0]}
            name={name}
            priceUAH={priceUAH}
            priceUSD={priceUSD}
            stock={stock}
            styleCard={(index + 1) % cardsPerPage === 0 ? 'lastCard' : 'card'}
          />
        ),
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
                  to={`/${translit(title)}`}
                  onClick={() => {
                    dispatch(setCategoryProducts([]));
                    dispatch(setSubCategoryProducts([]));
                    localStorage.removeItem('category');
                    localStorage.removeItem('subcategory');
                    window.scrollTo(0, 0);
                  }}>
                  Показати ще...
                </NavLink>
              )}
            </div>
          </div>
        ) : need_A_Slider ? (
          <div className="wrapperSlider sliderCard">
            {title && (
              <NavLink
                to={`/${translit(title)}`}
                onClick={() => {
                  dispatch(setCategoryProducts([]));
                  dispatch(setSubCategoryProducts([]));
                  localStorage.removeItem('category');
                  localStorage.removeItem('subcategory');
                  window.scrollTo(0, 0);
                }}>
                <h2 className={style.titleCategory}>{title} :</h2>
              </NavLink>
            )}
            <Slide {...properties}>
              {cards.map(
                ({id, pictures, name, priceUAH, priceUSD, stock}, index) => (
                  <Card
                    key={id}
                    id={id}
                    imgUrl={pictures[0]}
                    name={name}
                    priceUAH={priceUAH}
                    priceUSD={priceUSD}
                    stock={stock}
                    styleCard={'lastCard'}
                  />
                ),
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

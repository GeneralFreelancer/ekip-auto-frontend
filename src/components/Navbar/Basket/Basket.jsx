import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import style from "./Basket.module.scss";
import ProductItem from "./ProductItem";
import { ReactComponent as ShoppingCard } from "../../../assets/svg/basket/shopping-cart.svg";

let numberOfProducts0 = [
  {
    id: 1,
    imgUrl:
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    amount: "1500",
  },
  {
    id: 2,
    imgUrl:
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    amount: "1500",
  },
  {
    id: 3,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/LetterG.svg/800px-LetterG.svg.png",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    amount: "1500",
  },
  {
    id: 4,
    imgUrl:
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    amount: "1500",
  },
  {
    id: 5,
    imgUrl:
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    amount: "1500",
  },
  {
    id: 6,
    imgUrl:
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    amount: "1500",
  },
  {
    id: 7,
    imgUrl:
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    amount: "1500",
  },
  {
    id: 8,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/LetterG.svg/800px-LetterG.svg.png",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    amount: "1500",
  },
  {
    id: 9,
    imgUrl:
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    amount: "1500",
  },
  {
    id: 10,
    imgUrl:
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    title: "Lampa is wery good lampa",
    priceUAH: "5000",
    priseUSD: "500",
    amount: "1500",
  },
];

const Basket = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [numberOfProducts, setNumberOfProducts] = useState(numberOfProducts0);
  const [timeoutId, setTimeoutId] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  let desktopV = viewportWidth > 1024;

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handelClick = () => {
    setShowModal((prevState) => !prevState);
  };

  const removeFromBasket = (id) => {
    setNumberOfProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  // console.log(showModal);
  return (
    <>
      <div
        className={
          !showModal ? style.wrapperShoppingCard : style.wrapperShoppingCardOpen
        }
        onClick={handelClick}
      >
        <NavLink to="/myprofile/basket">
          <ShoppingCard
            className={!showModal ? style.shoppingCard : style.shoppingCardOpen}
          />
          <div className={!showModal ? style.number : style.numberOpen}>
            <p>{numberOfProducts.length}</p>
          </div>
        </NavLink>

        {desktopV && showModal && (
          <div className={style.modalCard}>
            {numberOfProducts.length ? (
              <ul>
                {numberOfProducts.map(
                  ({ id, imgUrl, title, priceUAH, priseUSD, amount }) => (
                    <ProductItem
                      key={id}
                      id={id}
                      imgUrl={imgUrl}
                      title={title}
                      priceUAH={priceUAH}
                      priseUSD={priseUSD}
                      amount={amount}
                      removeFromBasket={removeFromBasket}
                    />
                  )
                )}
              </ul>
            ) : (
              <p className={style.textAlert}>
                Ви ще не зробили жодного замовлення
              </p>
            )}

            <div className={style.wrapperPrice}>
              <p className={style.price}>Загальна вартість:</p>
              <div>
                <p>
                  {numberOfProducts.reduce((accumulator, currentValue) => {
                    return accumulator + Number(currentValue.priceUAH);
                  }, 0)}{" "}
                  UAH
                </p>
                <p>
                  {numberOfProducts.reduce((accumulator, currentValue) => {
                    return accumulator + Number(currentValue.priseUSD);
                  }, 0)}{" "}
                  $
                </p>
              </div>
            </div>

            <NavLink className={style.button} to="/myprofile/basket">
              Перейти до замовлення
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Basket;

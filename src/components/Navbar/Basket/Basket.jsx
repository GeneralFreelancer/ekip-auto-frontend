import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "./Basket.module.scss";
import ProductItem from "./ProductItem";
import { ReactComponent as ShoppingCard } from "../../../assets/svg/basket/shopping-cart.svg";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";
import { setProductsInCart } from "../../../redux/features/cartSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

// let numberOfProducts0 = [
//   {
//     id: 1,
//     imgUrl:
//       "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     amount: "1500",
//   },
//   {
//     id: 2,
//     imgUrl:
//       "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     amount: "1500",
//   },
//   {
//     id: 3,
//     imgUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/LetterG.svg/800px-LetterG.svg.png",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     amount: "1500",
//   },
//   {
//     id: 4,
//     imgUrl:
//       "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     amount: "1500",
//   },
//   {
//     id: 5,
//     imgUrl:
//       "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     amount: "1500",
//   },
//   {
//     id: 6,
//     imgUrl:
//       "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     amount: "1500",
//   },
//   {
//     id: 7,
//     imgUrl:
//       "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     amount: "1500",
//   },
//   {
//     id: 8,
//     imgUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/LetterG.svg/800px-LetterG.svg.png",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     amount: "1500",
//   },
//   {
//     id: 9,
//     imgUrl:
//       "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     amount: "1500",
//   },
//   {
//     id: 10,
//     imgUrl:
//       "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//     title: "Lampa is wery good lampa",
//     priceUAH: "5000",
//     priseUSD: "500",
//     amount: "1500",
//   },
// ];

const Basket = () => {
  const [showModal, setShowModal] = useState(false);
  const [numberOfProducts, setNumberOfProducts] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const user = useSelector(selectedUser);

  let desktopV = viewportWidth > 1024;

   useEffect(() => {
    const getProductsFromCart = async () => {
      try {
        const response = await axios.get(`${baseUrl}/basket`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setNumberOfProducts(response.data.basket.products);
        dispatch(setProductsInCart(response.data.basket.products));
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    getProductsFromCart();
  }, [dispatch, user.token]);


  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const wrapperShoppingCardRef = useRef(null);
  useEffect(() => {
    const handleClickWindow = (e) => {
      if (showModal === true) {
        // console.dir(e.target.tagName);
        if (
          wrapperShoppingCardRef.current &&
          !wrapperShoppingCardRef.current.contains(e.target) &&
          e.target.tagName !== "SPAN"
        ) {
          setShowModal(false);
        }
      }
    };

    if (showModal === true) {
      window.addEventListener("click", handleClickWindow);
    } else {
      window.removeEventListener("click", handleClickWindow);
    }
    // Повернути функцію очищення ефекту
    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, [showModal]);

  const handelClick = () => {
    setShowModal((prevState) => !prevState);
  };

  const removeFromBasket = async(id) => {
    // setNumberOfProducts((prevProducts) =>
    //   prevProducts.filter((product) => product.id !== id)
    // );
    console.log(id);
    const arrayWithoutDeletedProduct = [...numberOfProducts].filter(
      (item) => item.product.id !== id
    );
    console.log(arrayWithoutDeletedProduct);
    try {
      const response = await axios.post(
        `${baseUrl}/basket`,
        { products: arrayWithoutDeletedProduct },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      setNumberOfProducts(response.data.basket.products);
      dispatch(setProductsInCart(response.data.basket.products));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const sumUAH = numberOfProducts.reduce((total, item) => {
    return total + item.number * item.product.priceUAH;
  }, 0);

  const sumUSD = numberOfProducts.reduce((total, item) => {
    return total + item.number * item.product.priceUSD;
  }, 0);


  return (
    <div ref={wrapperShoppingCardRef}>
      <div
        className={
          !showModal ? style.wrapperShoppingCard : style.wrapperShoppingCardOpen
        }
      >
        <div onClick={handelClick}>
          <ShoppingCard
            className={!showModal ? style.shoppingCard : style.shoppingCardOpen}
          />
          <div className={!showModal ? style.number : style.numberOpen}>
            <p>{numberOfProducts.length}</p>
          </div>
        </div>

        {desktopV && showModal && (
          <div className={style.modalCard}>
            {numberOfProducts.length ? (
              <ul>
                {numberOfProducts.map(
                  (item) => (
                    <ProductItem
                      key={item.product.id}
                      id={item.product.id}
                      imgUrl={item.product.pictures[0]}
                      title={item.product.name}
                      priceUAH={item.product.priceUAH}
                      priseUSD={item.product.priceUSD}
                      amount={item.number}
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
                  {/* {numberOfProducts.reduce((accumulator, currentValue) => {
                    return accumulator + Number(currentValue.priceUAH);
                  }, 0)}{" "} */}
                  {sumUAH}
                  UAH
                </p>
                <p>
                  {/* {numberOfProducts.reduce((accumulator, currentValue) => {
                    return accumulator + Number(currentValue.priseUSD);
                  }, 0)}{" "} */}
                  {sumUSD}
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
    </div>
  );
};

export default Basket;

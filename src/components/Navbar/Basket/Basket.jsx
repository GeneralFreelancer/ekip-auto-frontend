import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import style from "./Basket.module.scss";
import ProductItem from "./ProductItem";
import { ReactComponent as ShoppingCard } from "../../../assets/svg/basket/shopping-cart.svg";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";
import { selectedCart } from "../../../redux/features/cartSlice";
import { setProductsInCart } from "../../../redux/features/cartSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Basket = () => {
  const [showModal, setShowModal] = useState(false);
  const [numberOfProducts, setNumberOfProducts] = useState([]);
  // const [timeoutId, setTimeoutId] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const user = useSelector(selectedUser);
  const cart = useSelector(selectedCart);

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
    setNumberOfProducts(cart.cartProducts)
  };

  const removeFromBasket = async (id) => {
      const arrayWithoutDeletedProduct = [...numberOfProducts]
      .filter((item) => item.product.id !== id)
      .map((p) => ({ product: p.product.id, number: p.number }));
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

  const sumUAH = numberOfProducts?.reduce((total, item) => {
    return total + item.number * item.product.priceUAH;
  }, 0);

  const sumUSD = numberOfProducts?.reduce((total, item) => {
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
            <p>{cart.cartProducts?.length ? cart.cartProducts.length : 0}</p>
          </div>
        </div>

        {desktopV && showModal && (
          <div className={style.modalCard}>
            {numberOfProducts?.length ? (
              <ul>
                {numberOfProducts.map((item) => (
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
                ))}
              </ul>
            ) : (
              <p className={style.textAlert}>
                Корзина пуста
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
                  {sumUSD}$
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

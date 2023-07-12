import style from "./Cart.module.scss";
import { useMediaPredicate } from "react-media-hook";
import { useEffect, useState } from "react";
import TableHead from "./TableHead/TableHead";
import TableHeadMiddle from "./TableHead/TableHeadMiddle";
import TableBody from "./TableBody/TableBody";
import TableBodyMiddle from "./TableBody/TableBodyMiddle";
import TableFooter from "./TableFooter/TableFooter";
import TableFooterMiddle from "./TableFooter/TableFooterMiddle";
import TableBodyMobile from "./TableBody/TableBodyMobile";
import TableFooterMobile from "./TableFooter/TableFooterMobile";
import { setProductsInCart } from "../../../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";
import { selectedCart } from "../../../redux/features/cartSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Cart = () => {
  const desktop = useMediaPredicate("(min-width: 1024px)");
  const middle = useMediaPredicate(
    "(min-width: 540px) and (max-width: 1023px)"
  );
  const mobile = useMediaPredicate("(max-width: 540px)");
  const [dataCartItems, setDataCartItems] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectedUser);
  const cart = useSelector(selectedCart);

  useEffect(() => {
    const getProductsFromCart = async () => {
      try {
        const response = await axios.get(`${baseUrl}/basket`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setDataCartItems(response.data.basket.products);
        dispatch(setProductsInCart(response.data.basket.products));
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    getProductsFromCart();
  }, [dispatch, user.token]);

  useEffect(() => {
    const updatedDataCartItems = dataCartItems.map((item) => {
      if (user.userdata.favoriteProducts.includes(item.product.id)) {
        return {
          ...item,
          favorite: true,
        };
      }
      return {
        ...item,
        favorite: false,
      };
    });
    setDataCartItems(updatedDataCartItems);
  }, [user.userdata.favoriteProducts]);

  //  not work
  const checkfavorite = async (id) => {
    const updatedDataCartItems = dataCartItems.map((item) => {
      if (item.product.id === id) {
        return {
          ...item,
          favorite: !item.favorite,
        };
      }
      return item;
    });
    setDataCartItems(updatedDataCartItems);
    try {
      const response = await axios.put(
        `${baseUrl}/user/favorite`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (id) => {
    const arrayWithoutDeletedProduct = [...dataCartItems]
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
      setDataCartItems(response.data.basket.products);
      dispatch(setProductsInCart(response.data.basket.products));
      console.log(response.data.basket.products);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // not work
  const changeQuantity = async (id, btnType) => {
    if (btnType === "up") {
      setDataCartItems(
        dataCartItems.filter((item) =>
          item.product.id === id ? (item.number += item.product.minQuantity) : item.number
        )
      );
    }
    if (btnType === "down") {
      setDataCartItems(
        dataCartItems.filter((item) =>
          item.product.id === id && item.number > item.product.minQuantity
            ? (item.number -= item.product.minQuantity)
            : item.number
        )
      );
    }
    try {
      const response = await axios.put(
        `${baseUrl}/basket`,
        {
          product: id,
          // number: productQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response.data.basket.products);
      setDataCartItems(response.data.basket.products);
      dispatch(setProductsInCart(response.data.basket.products));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const createOrder = async () => {
    const orderProducts = dataCartItems?.map((item) => ({
      product: item.product.id,
      number: item.number,
    }));

    try {
      const response = await axios.post(
        `${baseUrl}/order-history`,
        { products: orderProducts },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setOrderSuccess(response.data.success);
      dispatch(setProductsInCart(null));
    } catch (error) {
      console.error(error);
    }
  };

  const sumUAH = dataCartItems?.reduce((total, item) => {
    return total + item.number * item.product.priceUAH;
  }, 0);

  const sumUSD = dataCartItems?.reduce((total, item) => {
    return total + item.number * item.product.priceUSD;
  }, 0);

  const leftComment = (event) => {
    event.preventDefault();
    !isActive ? setIsActive(true) : setIsActive(false);
  };
  return (
    <>
      {/* {cart.cartProducts?.length ? ( */}
      <div className={style.cart__wrapper}>
        {!orderSuccess ? (
          <>
            {desktop && <TableHead />}
            <table className={style.cart__table}>
              <thead>{middle && <TableHeadMiddle />}</thead>
              <tbody>
                {desktop && (
                  <TableBody
                    changeQuantity={changeQuantity}
                    checkFavorire={checkfavorite}
                    delete={remove}
                    data={dataCartItems}
                  />
                )}
                {middle && (
                  <TableBodyMiddle
                    changeQuantity={changeQuantity}
                    checkFavorire={checkfavorite}
                    delete={remove}
                    data={dataCartItems}
                  />
                )}
                {mobile && (
                  <TableBodyMobile
                    changeQuantity={changeQuantity}
                    checkFavorire={checkfavorite}
                    delete={remove}
                    data={dataCartItems}
                  />
                )}
              </tbody>
              <tfoot>
                {desktop && <TableFooter sumUAH={sumUAH} sumUSD={sumUSD} />}
                {middle && (
                  <TableFooterMiddle sumUAH={sumUAH} sumUSD={sumUSD} />
                )}
                {mobile && (
                  <TableFooterMobile sumUAH={sumUAH} sumUSD={sumUSD} />
                )}
              </tfoot>
            </table>
            <div className={style.cart__downloadOrder}>
              <div className={style.cart__downloadOrder_wrapper}>
                <button>
                  Cкачать Excel <span className={style.downloadIcon}></span>
                </button>
                <p>*Для більш детального розрахунку звавантажте Excel.</p>
              </div>
            </div>
            <div className={style.cart__commentToOrder}>
              <form name={"comment"}>
                <div className={style.cart__commentToOrder_wrapper}>
                  {isActive && (
                    <textarea
                      name={"comment"}
                      id={"dsfsdf"}
                      cols="30"
                      rows="10"
                    ></textarea>
                  )}
                  <button
                    onClick={(e) => {
                      leftComment(e);
                    }}
                    className={isActive ? style.active : ""}
                    type="submit"
                  >
                    додати коментар до замовлення
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className={style.cart__succesOrder}>
            <h1>Дякуємо за замовлення!</h1>
          </div>
        )}

        <div className={style.cart__orderBtn}>
          <div>
            {!orderSuccess && (
              <button
                type="submit"
                onClick={createOrder}
                disabled={cart.cartProducts === null}
              >
                замовити
              </button>
            )}
            {orderSuccess && (
              <p>
                *Наш менеджер зв'яжеться з вами після замовлення для
                підтвердження деталей замовлення.
              </p>
            )}
          </div>
        </div>
      </div>
      {/* ) : (
        <h1 style={{textAlign: 'center', marginTop: '100px'}}>Корзина пуста</h1>
      )} */}
    </>
  );
};

export default Cart;

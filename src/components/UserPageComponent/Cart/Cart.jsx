import style from './Cart.module.scss';
import {useMediaPredicate} from 'react-media-hook';
import {useEffect, useState} from 'react';
import TableHead from './TableHead/TableHead';
import TableHeadMiddle from './TableHead/TableHeadMiddle';
import TableBody from './TableBody/TableBody';
import TableBodyMiddle from './TableBody/TableBodyMiddle';
import TableFooter from './TableFooter/TableFooter';
import TableFooterMiddle from './TableFooter/TableFooterMiddle';
import TableBodyMobile from './TableBody/TableBodyMobile';
import TableFooterMobile from './TableFooter/TableFooterMobile';
import {
  setProductsInCart,
  addProductsToCart,
  deleteProductsFromCart,
  updateProductQuantityInCart,
} from '../../../redux/features/cartSlice';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {selectedUser} from '../../../redux/features/userSlice';
import {selectedCart} from '../../../redux/features/cartSlice';
import {Link} from 'react-router-dom';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Cart = () => {
  const desktop = useMediaPredicate('(min-width: 1024px)');
  const middle = useMediaPredicate(
    '(min-width: 540px) and (max-width: 1023px)',
  );
  const mobile = useMediaPredicate('(max-width: 540px)');
  const [dataCartItems, setDataCartItems] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const user = useSelector(selectedUser);
  const cart = useSelector(selectedCart);

  useEffect(() => {
    const getProductsFromCart = async () => {
      const productsFromLocalStorage = JSON.parse(
        localStorage.getItem('basket'),
      );

      if (localStorage.getItem('basket')) {
        setDataCartItems(productsFromLocalStorage);
        dispatch(addProductsToCart(productsFromLocalStorage));
      }

      setIsLoading(false);
    };
    getProductsFromCart();
  }, [dispatch, user.token]);

  const remove = async (id) => {
    const arrayWithoutDeletedProduct = [...dataCartItems]
      .filter((item) => item.id !== id)
      .map((p) => ({product: p.id, quantity: p.quantity}));
    setDataCartItems(arrayWithoutDeletedProduct);
    dispatch(deleteProductsFromCart(arrayWithoutDeletedProduct));
    localStorage.removeItem('basket');
    localStorage.setItem('basket', JSON.stringify(arrayWithoutDeletedProduct));
  };

  // change quantity
  const changeQuantity = async (id, btnType) => {
    let updateQuantity = [...dataCartItems];
    if (btnType === 'up') {
      updateQuantity = updateQuantity.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            product: item.id,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });
    }
    if (btnType === 'down') {
      updateQuantity = updateQuantity.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return {
            ...item,
            product: item.id,
            quantity: item.quantity - 1,
          };
        } else {
          return item;
        }
      });
    }

    setDataCartItems(updateQuantity);
    updateQuantity.forEach((product) =>
      dispatch(updateProductQuantityInCart(product)),
    );
    localStorage.removeItem('basket');
    localStorage.setItem('basket', JSON.stringify(updateQuantity));
  };

  const createOrder = async () => {
    const orderProducts = dataCartItems?.map((item) => ({
      product: item.id,
      name: item.name,
      quantity: item.quantity,
      weight: 0,
      payed: false,
    }));

    try {
      const response = await axios.post(
        `${baseUrl}/order-history`,
        {products: orderProducts, comment: comment},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      setOrderSuccess(response.data.success);
      dispatch(setProductsInCart());
      localStorage.removeItem('basket');
    } catch (error) {
      console.error(error);
    }
  };

  const downloadExcelFile = async () => {
    try {
      const response = await axios.get(`${baseUrl}/basket/xlsx`);
      const fileUrl = response.data.file;
      window.open(fileUrl, '_blank');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const sumUAH = dataCartItems?.reduce((total, item) => {
    return total + item.quantity * item.priceUAH;
  }, 0);

  const sumUSD = dataCartItems?.reduce((total, item) => {
    return total + item.quantity * item.priceUSD;
  }, 0);

  const leftComment = (event) => {
    event.preventDefault();
    !isActive ? setIsActive(true) : setIsActive(false);
  };
  return (
    <>
      <div className={style.cart__wrapper}>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <>
            {!orderSuccess ? (
              <>
                {dataCartItems?.length > 0 ? (
                  <>
                    {desktop && <TableHead />}
                    <table className={style.cart__table}>
                      <thead>{middle && <TableHeadMiddle />}</thead>
                      <tbody>
                        {desktop && (
                          <TableBody
                            changeQuantity={changeQuantity}
                            delete={remove}
                            data={dataCartItems}
                          />
                        )}
                        {middle && (
                          <TableBodyMiddle
                            changeQuantity={changeQuantity}
                            delete={remove}
                            data={dataCartItems}
                          />
                        )}
                        {mobile && (
                          <TableBodyMobile
                            changeQuantity={changeQuantity}
                            delete={remove}
                            data={dataCartItems}
                          />
                        )}
                      </tbody>
                      <tfoot>
                        {desktop && (
                          <TableFooter sumUAH={sumUAH} sumUSD={sumUSD} />
                        )}
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
                        <button onClick={downloadExcelFile}>
                          Cкачать Excel
                          <span className={style.downloadIcon}></span>
                        </button>
                        <p>
                          *Для більш детального розрахунку звавантажте Excel.
                        </p>
                      </div>
                    </div>
                    <div className={style.cart__commentToOrder}>
                      <form name={'comment'}>
                        <div className={style.cart__commentToOrder_wrapper}>
                          {isActive && (
                            <textarea
                              name={'comment'}
                              id={'dsfsdf'}
                              cols="30"
                              rows="10"
                              value={comment}
                              onChange={(e) =>
                                setComment(e.target.value)
                              }></textarea>
                          )}
                          <button
                            onClick={(e) => {
                              leftComment(e);
                            }}
                            className={isActive ? style.active : ''}
                            type="submit">
                            додати коментар до замовлення
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  <div style={{textAlign: 'center'}}>
                    <h1>Корзина пуста</h1>
                  </div>
                )}
              </>
            ) : (
              <div className={style.cart__succesOrder}>
                <h1>Дякуємо за замовлення!</h1>
              </div>
            )}

            <div className={style.cart__orderBtn}>
              <div>
                {!orderSuccess &&
                  cart.cartProducts &&
                  cart.cartProducts.length > 0 && (
                    <>
                      {user?.isDataFullFilled ? (
                        <>
                          <button
                            type="submit"
                            onClick={createOrder}
                            disabled={cart.cartProducts === null}>
                            замовити
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to="/myprofile/mydata" style={{color: 'red'}}>
                            Для здійслення замовлення заповніть дані
                          </Link>
                        </>
                      )}
                    </>
                  )}

                {orderSuccess && (
                  <p>
                    *Наш менеджер зв'яжеться з вами після замовлення для
                    підтвердження деталей замовлення.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;

import {useState, useEffect, useRef} from 'react';
import {useNavigate, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from './ProductItem';
import {selectedUser} from '../../../redux/features/userSlice';
import {selectedCart} from '../../../redux/features/cartSlice';
import {
  deleteProductsFromCart,
  updateProductQuantityInCart,
} from '../../../redux/features/cartSlice';
import {ReactComponent as ShoppingCard} from '../../../assets/svg/basket/shopping-cart.svg';

import style from './Basket.module.scss';

const Basket = ({onShowModal}) => {
  const [showModal, setShowModal] = useState(false);
  const [numberOfProducts, setNumberOfProducts] = useState([]);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectedUser);
  const cart = useSelector(selectedCart);

  let desktopV = viewportWidth > 1024;
  const exchangeRate = localStorage.getItem('exchangeRate');
  useEffect(() => {
    if (
      !numberOfProducts.length &&
      !cart.cartProducts.length &&
      JSON.parse(localStorage.getItem('basket'))?.length
    ) {
      setNumberOfProducts(JSON.parse(localStorage.getItem('basket')));
    }

    if (
      (!numberOfProducts.length && cart.cartProducts.length) ||
      numberOfProducts.length < cart.cartProducts.length
    ) {
      setNumberOfProducts(cart.cartProducts);
    }
  }, [numberOfProducts, cart.cartProducts]);

  useEffect(() => {
    if (!localStorage.getItem('basket')?.length && numberOfProducts.length) {
      localStorage.setItem('basket', JSON.stringify(numberOfProducts));
    }

    if (
      JSON.parse(localStorage.getItem('basket')) &&
      numberOfProducts.length >
        JSON.parse(localStorage.getItem('basket')).length
    ) {
      localStorage.removeItem('basket');
      localStorage.setItem('basket', JSON.stringify(numberOfProducts));
    }
  }, [numberOfProducts]);

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const wrapperShoppingCardRef = useRef(null);
  useEffect(() => {
    const handleClickWindow = (e) => {
      if (showModal === true) {
        if (
          wrapperShoppingCardRef.current &&
          !wrapperShoppingCardRef.current.contains(e.target) &&
          e.target.tagName !== 'SPAN'
        ) {
          setShowModal(false);
        }
      }
    };

    if (showModal === true) {
      window.addEventListener('click', handleClickWindow);
    } else {
      window.removeEventListener('click', handleClickWindow);
    }

    return () => {
      window.removeEventListener('click', handleClickWindow);
    };
  }, [showModal]);

  const handelClick = () => {
    setShowModal((prevState) => !prevState);
    if (viewportWidth <= 1024) {
      navigate('/myprofile/basket');
    }
  };

  const changeAmount = (id, quantity) => {
    setNumberOfProducts((prevProducts) => {
      const product = prevProducts.find((product) => product.id === id);
      const filteredProducts = prevProducts.filter(
        (product) => product.id !== id,
      );
      localStorage.removeItem('basket');
      localStorage.setItem(
        'basket',
        JSON.stringify([...filteredProducts, {...product, quantity}]),
      );
      return [...filteredProducts, {...product, quantity}];
    });
  };

  const removeFromBasket = async (id) => {
    const foundProduct = numberOfProducts.find((product) => product.id === id);
    dispatch(deleteProductsFromCart(foundProduct));

    const arrayWithoutDeletedProduct = [...numberOfProducts].filter(
      (item) => item.id !== id,
    );
    setNumberOfProducts(arrayWithoutDeletedProduct);

    localStorage.removeItem('basket');
    if (arrayWithoutDeletedProduct.length) {
      localStorage.setItem(
        'basket',
        JSON.stringify(arrayWithoutDeletedProduct),
      );
    }
  };

  const makeOrder = (products) => {
    dispatch(updateProductQuantityInCart(products));
  };

  const sumUAH = numberOfProducts?.reduce((total, item) => {
    if (
      item.quantity === item.minQuantity ||
      item.quantity < item.minQuantity1 - 1
    ) {
      return total + item.quantity * item.priceUAH;
    }

    if (item.quantity === item.minQuantity1) {
      return total + item.quantity * (item.priceUSD * exchangeRate);
    }

    if (item.quantity > item.minQuantity1) {
      return total + item.quantity * (item.priceUSDless * exchangeRate);
    }

    return total;
  }, 0);

  const sumUSD = numberOfProducts?.reduce((total, item) => {
    if (
      item.quantity === item.minQuantity ||
      item.quantity < item.minQuantity1 - 1
    ) {
      return total + item.quantity * Math.floor(item.priceUAH / exchangeRate);
    }

    if (item.quantity === item.minQuantity1) {
      return total + item.quantity * item.priceUSD;
    }

    if (item.quantity > item.minQuantity1) {
      return total + item.quantity * item.priceUSDless;
    }

    return total;
  }, 0);

  return (
    <div ref={wrapperShoppingCardRef}>
      <div
        className={
          !showModal ? style.wrapperShoppingCard : style.wrapperShoppingCardOpen
        }
        onClick={handelClick}>
        <div>
          <ShoppingCard
            className={!showModal ? style.shoppingCard : style.shoppingCardOpen}
          />
          <div className={!showModal ? style.number : style.numberOpen}>
            <p>{numberOfProducts.length ? numberOfProducts.length : 0}</p>
          </div>
        </div>
      </div>
      {desktopV && showModal && (
        <div className={style.modalCard}>
          {numberOfProducts?.length ? (
            <ul>
              {numberOfProducts.map((item) => (
                <ProductItem
                  key={item.id}
                  id={item.id}
                  imgUrl={item.pictures[0]}
                  title={item.name}
                  priceUAH={item.priceUAH}
                  priseUSD={item.priceUSD}
                  priseUSDless={item.priceUSDless}
                  quantity={item.quantity}
                  minQuantity={item.minQuantity}
                  minQuantity1={item.minQuantity1}
                  removeFromBasket={() => removeFromBasket(item.id)}
                  changeAmount={changeAmount}
                />
              ))}
            </ul>
          ) : (
            <p className={style.textAlert}>Корзина пуста</p>
          )}

          <div className={style.wrapperPrice}>
            <div>
              <p className={style.price}>Загальна вартість</p>
              <div className={style.topLine}></div>
            </div>

            <div className={style.priceContainer}>
              <p>
                {sumUAH}
                UAH
              </p>
              <div className={style.priceDevider}>
                <div className={style.priceLine}></div>
                <div className={style.deviderItem}></div>
              </div>
              <p>{sumUSD}$</p>
            </div>
          </div>
          {user.isLoggedIn ? (
            <div onClick={() => makeOrder(numberOfProducts)}>
              <NavLink className={style.button} to="/myprofile/basket">
                Перейти до замовлення
              </NavLink>
            </div>
          ) : (
            <span className={style.button} onClick={() => onShowModal()}>
              Перейти до замовлення
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Basket;

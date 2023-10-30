import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Plus from '../../../../assets/plus.png';
import Minus from '../../../../assets/minus.png';
import {
  setOneProduct,
  selectAllProducts,
} from '../../../../redux/features/productsSlice';
import style from './ProductItem.module.scss';

const ProductItem = ({
  id,
  imgUrl,
  title,
  priceUAH,
  priseUSD,
  priseUSDless,
  quantity,
  minQuantity,
  minQuantity1,
  removeFromBasket,
  changeAmount,
}) => {
  const exchangeRate = localStorage.getItem('exchangeRate');
  const [amountChange, setAmountChange] = useState(quantity);
  const [priceChange, setPriceChange] = useState({
    uah:
      amountChange === minQuantity || amountChange < minQuantity1 - 1
        ? priceUAH
        : quantity === minQuantity1
        ? Math.floor(priseUSD * exchangeRate)
        : quantity > minQuantity1
        ? Math.floor(priseUSDless * exchangeRate)
        : minQuantity,
    usd:
      amountChange === minQuantity || amountChange < minQuantity1 - 1
        ? Math.floor(priceUAH / exchangeRate)
        : quantity === minQuantity1
        ? priseUSD
        : quantity > minQuantity1
        ? priseUSDless
        : minQuantity,
  });
  const products = useSelector(selectAllProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRedirect = (id) => {
    const foundProduct = products.find((product) => product.id === id);
    dispatch(setOneProduct(foundProduct ? foundProduct : {}));
    navigate(`/${id}`);
  };
  const handleClick = () => {
    removeFromBasket(id);
  };

  function trimString(str) {
    if (str.length > 20) {
      return str.slice(0, 20) + '...';
    } else {
      return str;
    }
  }

  const handleMinusClick = (e) => {
    e.stopPropagation();
    if (amountChange > 1) {
      setAmountChange((prevQuantity) => {
        changeAmount(id, Number(prevQuantity) - 1);
        const localStorageProducts = JSON.parse(localStorage.getItem('basket'));
        localStorageProducts.forEach((product, i) => {
          if (localStorageProducts[i].id === id) {
            localStorageProducts[i].quantity = prevQuantity - 1;
          }
        });

        localStorage.removeItem('basket');
        localStorage.setItem('basket', JSON.stringify(localStorageProducts));

        return Number(prevQuantity) - 1;
      });
    }

    if (amountChange === minQuantity || amountChange < minQuantity1 - 1) {
      setPriceChange({uah: priceUAH, usd: Math.floor(priceUAH / exchangeRate)});
    }

    if (amountChange === minQuantity1) {
      setPriceChange({uah: Math.floor(priseUSD * exchangeRate), usd: priseUSD});
    }

    if (amountChange > minQuantity1) {
      setPriceChange({
        uah: Math.floor(priseUSDless * exchangeRate),
        usd: priseUSDless,
      });
    }
  };

  const handlePlusClick = (e) => {
    e.stopPropagation();
    setAmountChange((prevQuantity) => {
      changeAmount(id, Number(prevQuantity) + 1);
      const localStorageProducts = JSON.parse(localStorage.getItem('basket'));
      localStorageProducts.forEach((product, i) => {
        if (localStorageProducts[i].id === id) {
          localStorageProducts[i].quantity = prevQuantity + 1;
        }
      });

      localStorage.removeItem('basket');
      localStorage.setItem('basket', JSON.stringify(localStorageProducts));

      return Number(prevQuantity) + 1;
    });

    if (amountChange === minQuantity || amountChange < minQuantity1 - 1) {
      setPriceChange({uah: priceUAH, usd: Math.floor(priceUAH / exchangeRate)});
    }

    if (amountChange === minQuantity1) {
      setPriceChange({uah: Math.floor(priseUSD * exchangeRate), usd: priseUSD});
    }

    if (amountChange > minQuantity1) {
      setPriceChange({
        uah: Math.floor(priseUSDless * exchangeRate),
        usd: priseUSDless,
      });
    }
  };

  return (
    <li className={style.item}>
      <img className={style.image} src={imgUrl} alt="img" />
      <div className={style.wrapper} onClick={() => handleRedirect(id)}>
        <div className={style.wrapperFirst}>
          <p className={style.title}>{trimString(title)}</p>
          <div className={style.line}></div>
          <div className={style.productItem_quantity}>
            <div className={style.minus} onClick={(e) => handleMinusClick(e)}>
              <img src={Minus} alt="minus" />
            </div>
            <p className={style.productItem_quantity_info}>{amountChange}</p>
            <div className={style.plus} onClick={(e) => handlePlusClick(e)}>
              <img src={Plus} alt="plus" />
            </div>
          </div>
        </div>
        <div style={{textAlign: 'end'}}>
          <p className={style.price}>{priceChange.uah} UAH</p>
          <div className={style.lineContainer}>
            <div className={style.line}></div>
          </div>
          <p className={style.price}>{priceChange.usd} $</p>
        </div>
      </div>
      <span id={id} className={style.garbage} onClick={handleClick}></span>
    </li>
  );
};

export default ProductItem;

import style from './Card.module.scss';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setOneProduct} from '../../../redux/features/productsSlice';

const Card = ({id, imgUrl, name, priceUAH, priceUSD, stock, styleCard}) => {
  const exchangeRate = localStorage.getItem('exchangeRate');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div
      className={
        styleCard ? `${style[`${styleCard}`]} ${style.card}` : style.card
      }>
      <span
        className={style.clickArea}
        id={id}
        onClick={(e) => {
          dispatch(setOneProduct({}));
          navigate(`/${id}`);
          window.scrollTo(0, 0);
        }}></span>
      <div
        className={style.wrapperImg}
        style={{backgroundImage: `url(${imgUrl})`}}></div>
      <h3 className={style.title}>{name}</h3>
      <div className={style.wrapperText}>
        {stock ? (
          <p className={`${style.inStock} ${style.inStockYes}`}>В наявності</p>
        ) : (
          <p className={`${style.inStock} ${style.inStockNo}`}>
            Немає в наявності
          </p>
        )}
        <div className={style.wrapperPrice}>
          <p className={style.priceUSD}>
            {Math.floor(priceUAH / exchangeRate)} $
          </p>
          <p className={style.priceUAH}>{priceUAH} ₴</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import {ReactComponent as Heart} from '../../../../assets/svg/black_heart.svg';
import {addProductsToCart} from '../../../../redux/features/cartSlice';

import s from './FavoriteCard.module.scss';

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit
    .transform(String(name).replace(',', ''), '-')
    .toLowerCase();
};

const FavoriteCard = ({card, handelClick}) => {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    dispatch(addProductsToCart(card));
  };
  console.log('priseUSD ', card.priceUSD, card.priceUAH);
  return (
    <div
      className={
        card.styleCard ? `${s[`${card.styleCard}`]} ${s.card}` : s.card
      }>
      <span
        id={card.id}
        className={s.heart}
        onClick={() => handelClick(card.id)}></span>
      {/* <Heart id={id} className={s.heart} onClick={() => handelClick(id)} /> */}
      <span
        className={s.clickArea}
        id={card.id}
        onClick={(e) => {
          // console.log(e.target.id); /**add riderect link */
        }}></span>
      <div
        className={s.wrapperImg}
        style={{backgroundImage: `url(${card.pictures[0]})`}}></div>
      <h3 className={s.title}>{card.title}</h3>
      <div className={s.wrapperText}>
        {card.stock ? (
          <p className={`${s.inStock} ${s.inStockYes}`}>В наявності</p>
        ) : (
          <p className={`${s.inStock} ${s.inStockNo}`}>Немає в наявності</p>
        )}
        <div className={s.wrapperPrice}>
          <p className={s.priceUSD}>{card.priceUSD} $</p>
          <p className={s.priceUAH}>{card.priceUAH} ₴</p>
        </div>
      </div>
      <NavLink onClick={handleAddToCart} className={s.button}>
        Додати до кошика
      </NavLink>
    </div>
  );
};

export default FavoriteCard;

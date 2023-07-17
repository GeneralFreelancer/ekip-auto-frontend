import s from "./FavoriteCard.module.scss";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { ReactComponent as Heart } from "../../../../assets/svg/black_heart.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { setProductsInCart } from "../../../../redux/features/cartSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit
    .transform(String(name).replace(",", ""), "-")
    .toLowerCase();
};

const FavoriteCard = ({
  id,
  imgUrl,
  title,
  priceUAH,
  priseUSD,
  inStock,
  styleCard,
  minQuantity,
  handelClick,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectedUser);

  const handleAddToCart = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/basket`,
        {
          product: id,
          number: minQuantity
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(setProductsInCart(response.data.basket.products));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className={styleCard ? `${s[`${styleCard}`]} ${s.card}` : s.card}>
      <span id={id} className={s.heart} onClick={() => handelClick(id)}></span>
      {/* <Heart id={id} className={s.heart} onClick={() => handelClick(id)} /> */}
      <span
        className={s.clickArea}
        id={id}
        onClick={(e) => {
          // console.log(e.target.id); /**add riderect link */
        }}
      ></span>
      <div
        className={s.wrapperImg}
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
      <h3 className={s.title}>{title}</h3>
      <div className={s.wrapperText}>
        {inStock ? (
          <p className={`${s.inStock} ${s.inStockYes}`}>В наявності</p>
        ) : (
          <p className={`${s.inStock} ${s.inStockNo}`}>Немає в наявності</p>
        )}
        <div className={s.wrapperPrice}>
          <p className={s.priceUSD}>{priseUSD} $</p>
          <p className={s.priceUAH}>{priceUAH} ₴</p>
        </div>
      </div>
      <NavLink onClick={handleAddToCart} className={s.button}>
        Додати до кошика
      </NavLink>
      {/* <NavLink
        id={id}
        className={s.button}
        onClick={(e) => {
          console.log(e.target.id);
        }}
      >
        Додати до кошика
      </NavLink> */}
    </div>
  );
};

export default FavoriteCard;

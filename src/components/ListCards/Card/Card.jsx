import style from "./Card.module.scss";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { useNavigate } from "react-router-dom";

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit
    .transform(String(name).replace(",", ""), "-")
    .toLowerCase();
};

const Card = ({
  id,
  imgUrl,
  title,
  priceUAH,
  priseUSD,
  inStock,
  styleCard,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={
        styleCard ? `${style[`${styleCard}`]} ${style.card}` : style.card
      }
    >
      <span
        className={style.clickArea}
        id={id}
        onClick={(e) => {
          navigate("subcategory/:id");
          window.scrollTo(0, 0);
          console.log(e.target.id); /**add riderect link */
        }}
      ></span>
      <div
        className={style.wrapperImg}
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
      <h3 className={style.title}>{title}</h3>
      <div className={style.wrapperText}>
        {inStock ? (
          <p className={`${style.inStock} ${style.inStockYes}`}>В наявності</p>
        ) : (
          <p className={`${style.inStock} ${style.inStockNo}`}>
            Немає в наявності
          </p>
        )}
        <div className={style.wrapperPrice}>
          <p className={style.priceUSD}>{priseUSD} $</p>
          <p className={style.priceUAH}>{priceUAH} ₴</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

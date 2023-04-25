import style from "./Card.module.scss";
import CyrillicToTranslit from "cyrillic-to-translit-js";

const cyrillicToTranslit = new CyrillicToTranslit();
// rus to lat use this on backend for dynamic ulr
const translit = (name) => {
  return cyrillicToTranslit.transform(String(name).replace(',', ''), "-").toLowerCase();
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
  // console.log(styleCard);
  return (
    <div
      className={
        styleCard ? `${style[`${styleCard}`]} ${style.card}` : style.card
      }
      onClick={(e) =>{console.log(e.target)}}
    >
      {/* <span className={style.clickArea} onClick={(e) =>{console.log(e.target)}}> */}
      <div className={style.wrapperImg}>
        <img className={style.imgProduct} src={imgUrl} alt="photoProduct" />
      </div>
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
      {/* </span> */}
    </div>
  );
};

export default Card;

import style from "./ProductItem.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOneProduct } from "../../../../redux/features/productsSlice";

const ProductItem = ({
  id,
  imgUrl,
  title,
  priceUAH,
  priseUSD,
  amount,
  removeFromBasket,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRedirect = (id) => { 
    dispatch(setOneProduct({}));
    navigate(`/${id}`);
  }
  const handleClick = () => {
    removeFromBasket(id);
  };

  function trimString(str) {
    if (str.length > 20) {
      return str.slice(0, 20) + "...";
    } else {
      return str;
    }
  }

  return (
    <li className={style.item}>
      <img className={style.image} src={imgUrl} alt="img" />
      <div className={style.wrapper} onClick={() => handleRedirect(id)}>
        <div className={style.wrapperFirst}>
          <p>{trimString(title)}</p>
          <p>{amount} од.</p>
        </div>
        <div style={{ textAlign: "end" }}>
          <p>{amount * priceUAH} UAH</p>
          <p>{amount * priseUSD} $</p>
        </div>
      </div>
      <span id={id} className={style.garbage} onClick={handleClick}></span>
    </li>
  );
};

export default ProductItem;

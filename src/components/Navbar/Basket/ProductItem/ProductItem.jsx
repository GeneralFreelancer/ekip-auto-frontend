import style from './ProductItem.module.scss';

const ProductItem = ({
  id,
  imgUrl,
  title,
  priceUAH,
  priseUSD,
  amount,
  removeFromBasket,
}) => {
  const handleClick = () => {
    console.log(id);
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
            <img className={style.image } src={imgUrl} alt="image"/>
            <div className={style.wrapper}>
                <div className={style.wrapperFirst}>
                    <p>
                        {trimString(title)}
                    </p>
                    <p>
                        {amount}
                    </p>
                </div>
                <div >
                    <p>
                        {priceUAH} UAH
                    </p>
                    <p>
                        {priseUSD} $
                    </p>
                </div>
            </div>
            <span id={id} className={style.garbage }  onClick={handleClick}></span>
        </li>
    )
}

export default ProductItem;

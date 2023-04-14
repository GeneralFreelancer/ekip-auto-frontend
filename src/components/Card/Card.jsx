import style from './Card.module.scss'

const Card = ({ id, imgUrl, title, priceUAH, priseUSD, inStock, styleCard }) => {
console.log(styleCard)
    return (
        <div className={styleCard?`${style[`${styleCard}`]} ${style.card}`:style.card}>
            <div className={style.wrapperImg}>
                <img className={style.imgProduct} src={imgUrl} alt="photoProduct"/>
            </div>
            <h3 className={style.title}>
                {title}
            </h3>
            <div className={style.wrapperText}>
                {inStock ?
                <p className={`${style.inStock} ${style.inStockYes}`}>
                    В наявності
                </p>
                :
                <p className={`${style.inStock} ${style.inStockNo}`}>
                    Нема в наявності
                </p>
            }
           
            <div className={style.wrapperPrice}>
                <p className={style.priceUSD}>
                    {priceUAH} ₴
                </p>
                <p className={style.priceUAH}>
                    {priseUSD} $
                </p>
            </div>
            </div>
        </div>
    )
}

export default Card;
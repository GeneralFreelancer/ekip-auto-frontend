import { style } from './Basket.module.scss';
import ProductItem from './ProductItem';
import { ReactComponent as More } from '../../svg/basket/more.svg';

const Basket = ({numberOfProducts}) => {
    return (
        <>
            
            <BasketIcon></BasketIcon>
            {
                numberOfProducts.map(({ id, imgUrl, title, priceUAH, priseUSD, amount }) => (
                    <ProductItem
                        key={id}
                        img={imgUrl}
                        title={title}
                        priceUAH={priceUAH}
                        priceUSD={priseUSD}
                        amount={amount}
                    />
                ))
            }
            <p>
                Загальна вартість: {numberOfProducts.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.priceUAH;
                }, 0)}
            </p>
            <More />
            <p>
                Перейти до замовлення
            </p>
        </>
    )
}

export default Basket;
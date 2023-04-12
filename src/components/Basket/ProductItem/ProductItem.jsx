import { style } from './ProductItem.module.scss';
import { ReactComponent as Garbage } from '../../../svg/basket/garbage.svg';

const ProductItem = ({imgUrl, title, priceUAH, priseUSD, amount}) => {
    return (
        <>
            <img src={imgUrl} />
            <div>
                <div>
                    <p>
                        {title}
                    </p>
                    <p>
                        {amount}
                    </p>
                </div>
                <div>
                    <p>
                        {priceUAH}
                    </p>
                    <p>
                        {priseUSD}
                    </p>
                </div>
            </div>
            <Garbage/>
        </>
    )
}

export default ProductItem;
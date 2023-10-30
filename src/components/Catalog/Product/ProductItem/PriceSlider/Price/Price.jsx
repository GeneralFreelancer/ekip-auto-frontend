import s from './Price.module.scss';

const Price = ({priceUah, priceUsd, textStyles, last}) => {
  return (
    <div className={`${s.productItem_price} ${last ? s.last : ''}`}>
      <p>
        <span style={textStyles.price}>
          {priceUah} <span style={textStyles.priceSpan}>&#8372;/шт</span>
        </span>
      </p>
      <p>
        <span className={s.quontityText} style={textStyles.quontity}>
          {priceUsd} &#65284;/{'шт'}
        </span>
      </p>
    </div>
  );
};

export default Price;

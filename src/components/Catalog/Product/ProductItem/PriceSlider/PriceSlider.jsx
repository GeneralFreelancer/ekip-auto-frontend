import {useState} from 'react';
import Price from './Price/Price';
import PinComponent from './Pin/Pin';
import Line from './Line/Line';
import Quontity from './Quontity/Quontity';

import s from './PriceSlider.module.scss';

const PriceSlider = ({
  price1,
  price2,
  price3,
  minQuantity,
  minQuantity1,
  quantity,
  setQuantity,
}) => {
  const [sliderItemActive, setSliderItemActive] = useState(
    sliderItemActiveData(),
  );

  function sliderItemActiveData() {
    const activeData = {
      1: true,
      2: false,
      3: false,
      inactiveStyles: {
        quontity: {width: '104px', color: '#7c7b78', fontSize: '14px'},
        price: {borderColor: '#7c7b78', color: '#7c7b78', fontSize: '18px'},
        priceSpan: {color: '#7c7b78', fontSize: '14px'},
        chooseQuontity: {fontSize: '14px'},
      },
    };

    return activeData;
  }
  return (
    <div className={s.priceSliderContainer}>
      <div className={s.partsContainer}>
        <div className={s.priceSliderFirstPart}>
          <div className={s.priceFirstGroup}>
            <Price
              priceUah={price1.uah}
              priceUsd={price1.usd}
              textStyles={
                sliderItemActive['1'] ? {} : sliderItemActive.inactiveStyles
              }
              last={false}
            />
            <Price
              priceUah={price2.uah}
              priceUsd={price2.usd}
              textStyles={
                sliderItemActive['2'] ? {} : sliderItemActive.inactiveStyles
              }
              last={true}
            />
          </div>
        </div>

        <div className={s.priceSliderSecondPart}>
          <div className={s.priceSecondGroup}>
            <div style={{display: 'inline-block', height: '45px'}}></div>
            <Price
              priceUah={price3.uah}
              priceUsd={price3.usd}
              textStyles={
                sliderItemActive['3'] ? {} : sliderItemActive.inactiveStyles
              }
              last={true}
            />
          </div>
        </div>
      </div>

      {/* Dragable pin */}
      <PinComponent
        sliderItemActive={sliderItemActive}
        setSliderItemActive={setSliderItemActive}
        minQuantity={minQuantity}
        minQuantity1={minQuantity1}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      {/* Slider line */}
      <div className={s.lineContainer}>
        <Line first={true} />
        <Line first={false} />
      </div>

      <div className={s.productItemQuontity}>
        <Quontity
          quontity={`1-${minQuantity - 1}`}
          text={'шт.'}
          isActive={sliderItemActive['1']}
          styles={sliderItemActive.inactiveStyles}
        />
        <Quontity
          quontity={`${minQuantity}-${minQuantity1 - 1}`}
          text={'шт.'}
          isActive={sliderItemActive['2']}
          styles={sliderItemActive.inactiveStyles}
        />
        <Quontity
          quontity={`${minQuantity1}`}
          text={'шт. +'}
          isActive={sliderItemActive['3']}
          styles={sliderItemActive.inactiveStyles}
        />
      </div>
    </div>
  );
};

export default PriceSlider;

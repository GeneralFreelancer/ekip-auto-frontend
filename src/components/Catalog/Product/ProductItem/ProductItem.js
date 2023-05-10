import React from "react";
import s from "./ProductItem.module.scss";

const ProductItem = () => {
  return (
    <div className={s.productItem_block}>
      <div>
        <h1>ASUS 100500 G Arisl- Black (G170-48)</h1>
        <div className={s.productItem_image}></div>
      </div>

      <div>
        <p>В наявності</p>
        <div>
          <p>1500.99 грн/шт</p>
          <p>150.99 $/шт</p>
        </div>
        <div>
          <p>Мінімальне замовлення від: 500 шт.</p>
          <p>Залишок на складі:</p>
          <button>Запитати доступ</button>
        </div>
        <div>
          <p>Оберіть кількість товару:</p>
          <div>
            <div>-</div>
            <div>500</div>
            <div>+</div>
          </div>
        </div>
        <div>
          <p> Сумма:</p>
          <div>
            <div>150 000 грн</div>
            <div>45 00 $</div>
          </div>
        </div>
        <div>
          <button>Додати до кошика</button>
          <p>
            *Кількість товару ви зможете відредагувати при підтвердженні
            замовлення!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

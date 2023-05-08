import style from './Cart.module.scss';

const mockItems = [
  {
    id: "1",
    category: 'category',
    title: "Назва товару",
    description: 'lorem',
    options: [],
    deliveryOptions: [],
    SKU: 'number1212sdsd',
    favorite: false,
    price: [1000, 100],
    minQuantity: 100,
    stock: true,
    image: ['https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9'],
    url: 'http://#',
    
  },
]
const Cart = () => {
  return(
    <div className={style.cart__wrapper}>
      <div className={style.cart__grid_header}>
        <div className={style.cart__grid_header_col1}>
          <p className={style.cart__grid_colName}>№</p>   
        </div>
        <div className={style.cart__grid_header_header_col2}>
          <p className={style.cart__grid_colName}>зображення</p>   
        </div>
        <div className={style.cart__grid_header_col3}>
          <p className={style.cart__grid_colName}>назва/ артикул</p>   
        </div>
        <div className={style.cart__grid_header_col4}>
          <p className={style.cart__grid_colName}>ціна за шт.</p>   
        </div>
        <div className={style.cart__grid_header_col5}>
          <p className={style.cart__grid_colName}>кількість</p>   
        </div>
        <div className={style.cart__grid_header_col6}>
          <p className={style.cart__grid_colName}>загальна ціна</p>   
        </div>
      </div>
      <div className={style.cart__grid_body}>
        <div className={style.cart__grid_body_col1}>
          <p className={style.cart__grid_body_colNumb}>1</p>
        </div>
        <div className={style.cart__grid_body_col2}>
          <div className={style.cart__grid_body_colPicture}></div>
        </div>
        <div className={style.cart__grid_body_col3}>
          <div className={style.cart__grid_body_row1Title}>
            <h2 className={style.title}>title</h2>
            <span id={12} className={style.favorite}></span>
          </div>
          <div className={style.cart__grid_body_row2SKU}>
            <span className={style.sku_wrapper}>
              <p className={style.sku_text}>Art: UD 499 12-K</p>
            </span>
          </div>
        </div>
        <div className={style.cart__grid_body_col4}>
            <div className={style.cart__grid_body_row1Price}>
              <p className={style.nationalPrice}>1000 $</p>
            </div>
            <div className={style.cart__grid_body_row2Price}>
              <p className={style.internationPrice}>100 $</p>
            </div>
        </div>
        <div className={style.cart__grid_body_col5}>
          <div className={style.cart__grid_body_rowQuantity}>
            <p className={style.minQuantity}>Введіть кратно: <br/> 100</p>
          </div>
          <div className={style.cart__grid_body_rowInput}>
            <input className={style.inputStyle} type="text" />
          </div>
        </div>
        <div className={style.cart__grid_body_col6}>
          <div className={style.cart__grid_body_row1Summary}>
            <p className={style.nationalSummary}>10000 $</p>
          </div>
          <div className={style.cart__grid_body_row2Summary}>
            <p className={style.internationSummary}>1000 $</p>
          </div>
        </div>
        <div className={style.cart__grid_body_col7}>
          <span id={12} className={style.cart__grid_body_delete}></span>
        </div>
      </div>
      <div className={style.cart__grid_footer}>
        <div className={style.cart__grid_footer_col1Title}>
          <p className={style.summaryTitle}>загальна сума:</p>
        </div>
        <div className={style.cart__grid_footer_col2Summary}>
          <div className={style.cart__grid_footer_row1Summary}>
            <p className={style.nationalSummary}>10000 $</p>
          </div>
          <div className={style.cart__grid_footer_row2Summary}>
            <p className={style.internationSummary}>1000 $</p>
          </div>
        </div>
      </div>
      <div className={style.cart__downloadOrder}>
        <div className={style.cart__downloadOrder_wrapper}>
          <button>скачать Excel</button>
          <p>*для більш детального розрахунку звавантажте excel</p>
        </div>
      </div>
      <div className={style.cart__commentToOrder}>
        <div className={style.cart__commentToOrder_wrapper}>
          <form name={"comment"}>
            <textarea name={"comment"} id={"dsfsdf"} cols="30" rows="10"></textarea>
            <button type="submit">додати коментар до замовлення</button>
          </form>
        </div>
      </div>
      <div className={style.cart__orderBtn}>
        <button type="submit">замовити</button>
        <p>*наш менеджер зв'яжеться з вами після замовлення для підтвердження деталей замовлення</p>
      </div>
    </div>
  )
}

export default Cart;
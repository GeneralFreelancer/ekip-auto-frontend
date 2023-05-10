import style from './Cart.module.scss';
import TableBody from './TableBody/TableBody';

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
  {
    id: "2",
    category: 'category',
    title: "Назва товару",
    description: 'lorem',
    options: [],
    deliveryOptions: [],
    SKU: 'number12sdsd',
    favorite: false,
    price: [15000, 120],
    minQuantity: 100,
    stock: true,
    image: ['https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9'],
    url: 'http://#',
    
  },
  {
    id: "3",
    category: 'category',
    title: "Назва товару",
    description: 'lorem',
    options: [],
    deliveryOptions: [],
    SKU: 'number11sdsd',
    favorite: false,
    price: [10000, 160],
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
        <div className={style.cart__grid_header_col2}>
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
      <table className={style.cart__table}>
        <tbody>
          <TableBody />
        </tbody>
      </table>
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
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
    favorite: true,
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
          <TableBody data={mockItems}/>
        </tbody>
        <tfoot>
          <tr>
            <td className={style.borderNone}></td>
            <td className={style.borderNone}></td>
            <td className={style.borderNone}></td>
            <td className={style.borderNone}></td>
            <td className={style.cart__table_summaryTitle}>
              <p className={style.summaryTitle}>загальна сума:</p>
            </td>
            <td className={style.cart__table_summaryWrapper}>
              <div>
                <p className={style.nationalSummary}>10000000.6 &#8372;</p>
              </div>
              <div>
                <p className={style.internationalSummary}>4900.4 &#65284;</p>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div className={style.cart__downloadOrder}>
        <div className={style.cart__downloadOrder_wrapper}>
          <button>Cкачать Excel <span className={style.downloadIcon}></span></button>
          <p>*Для більш детального розрахунку звавантажте Excel.</p>
        </div>
      </div>
      <div className={style.cart__commentToOrder}>
          <form name={"comment"}>
            <div className={style.cart__commentToOrder_wrapper}>
              <textarea name={"comment"} id={"dsfsdf"} cols="30" rows="10"></textarea>
              <button type="submit">додати коментар до замовлення</button>
            </div>
          </form>
      </div>
      <div className={style.cart__orderBtn}>
        <div>
          <button type="submit">замовити</button>
          <p>*Наш менеджер зв'яжеться з вами після замовлення для підтвердження деталей замовлення.</p>
        </div>
      </div>
    </div>
  )   
}

export default Cart;
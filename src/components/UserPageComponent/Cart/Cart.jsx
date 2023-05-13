import style from './Cart.module.scss';
import { useMediaPredicate } from "react-media-hook";
import TableHead from './TableHead/TableHead';
import TableHeadMiddle from './TableHead/TableHeadMiddle';
import TableBody from './TableBody/TableBody';
import TableBodyMiddle from './TableBody/TableBodyMiddle';
import TableFooter from './TableFooter/TableFooter';
import TableFooterMiddle from './TableFooter/TableFooterMiddle'; 
import TableBodyMobile from './TableBody/TableBodyMobile';
import TableFooterMobile from './TableFooter/TableFooterMobile';

const mockItems = [
  {
    id: "1",
    category: 'category',
    title: "Назва товаруНазва товаруНазва товару",
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
  const desktop = useMediaPredicate("(min-width: 1024px)");
  const middle = useMediaPredicate("(min-width: 540px) and (max-width: 1023px)");
  const mobile = useMediaPredicate("(max-width: 540px)");
  console.log(middle);
  return(
    <div className={style.cart__wrapper}>
      {desktop && <TableHead />}
      <table className={style.cart__table}>
        <thead>
          {middle && <TableHeadMiddle />}
        </thead>
        <tbody>
          {desktop && <TableBody data={mockItems}/>}
          {middle && <TableBodyMiddle data={mockItems}/>}
          {mobile && <TableBodyMobile data={mockItems}/>}
        </tbody>
        <tfoot>
          {desktop && <TableFooter />}
          {middle && <TableFooterMiddle />}
          {mobile && <TableFooterMobile />}
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
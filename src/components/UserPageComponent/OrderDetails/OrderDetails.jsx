import style from './OrderDetails.module.scss';
import { useMediaPredicate } from "react-media-hook";
import TableHead from './TableHead/TableHead';
import TableHeadMiddle from './TableHead/TableHeadMiddle';
import TableBody from './TableBody/TableBody';
import TableBodyMiddle from './TableBody/TableBodyMiddle';
import TableFooter from './TableFooter/TableFooter';
import TableFooterMiddle from './TableFooter/TableFooterMiddle'; 
import TableBodyMobile from './TableBody/TableBodyMobile';
import TableFooterMobile from './TableFooter/TableFooterMobile';

const mockOrder = [
  {
    id: "1",
    title: "Замовлення від 22 березня на 4500",
    goods: [{
      id: "1",
      category: 'category',
      title: "Назва товару",
      description: 'lorem',
      options: [],
      deliveryOptions: [],
      SKU: 'number12sdsd',
      favorite: false,
      price: [15000, 120],
      minQuantity: 100,
      stock: false,
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
      SKU: 'number12sdsd',
      favorite: true,
      price: [15000, 120],
      minQuantity: 100,
      stock: false,
      image: ['https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9'],
      url: 'http://#',
      
    }, ],
    deliveryWeight: 105.6,
    totalPrice: [100000, 20000],
    paidStatus: true,
    url: '/myprofile/order-history-details',
    date: 1679497533000
    
  },
  {
    id: "2",
    title: "Замовлення від 15 січьня на 4500",
    goods: [{
      id: "1",
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
      SKU: 'number12sdsd',
      favorite: true,
      price: [15000, 120],
      minQuantity: 100,
      stock: false,
      image: ['https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9'],
      url: 'http://#',
      
    }, ],
    deliveryWeight: 105.6,
    totalPrice: [100000, 20000],
    paidStatus: false,
    url: '/myprofile/order-history-details',
    date: 1673795133000
    
  },  {
    id: "3",
    title: "Замовлення від 22 лютого на 4500",
    goods: [{
      id: "1",
      category: 'category',
      title: "Назва товару",
      description: 'lorem',
      options: [],
      deliveryOptions: [],
      SKU: 'number12sdsd',
      favorite: true,
      price: [15000, 120],
      minQuantity: 100,
      stock: false,
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
      SKU: 'number12sdsd',
      favorite: true,
      price: [15000, 120],
      minQuantity: 100,
      stock: false,
      image: ['https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9'],
      url: 'http://#',
      
    }, ],
    deliveryWeight: 105.6,
    totalPrice: [100000, 20000],
    paidStatus: false,
    url: '/myprofile/order-history-details',
    date: 1677078333000
    
  },
]

const OrderDetails = () => {
  
  const {goods} = mockOrder[0];
  console.log(goods);
  const desktop = useMediaPredicate("(min-width: 1024px)");
  const middle = useMediaPredicate("(min-width: 540px) and (max-width: 1023px)");
  const mobile = useMediaPredicate("(max-width: 540px)");
  return(
    <div className={style.orderDetails__wrapper}>
      {desktop && <TableHead />}
      <table className={style.orderDetails__table}>
        <thead>
          {middle && <TableHeadMiddle />}
        </thead>
        <tbody>
          {desktop && <TableBody data={goods}/>}
          {middle && <TableBodyMiddle data={goods}/>}
          {mobile && <TableBodyMobile data={goods}/>}
        </tbody>
        <tfoot>
          {desktop && <TableFooter />}
          {middle && <TableFooterMiddle />}
          {mobile && <TableFooterMobile />}
        </tfoot>
      </table>
      <div className={style.orderDetails__downloadOrder}>
        <div className={style.orderDetails__downloadOrder_wrapper}>
          <button>Cкачать Excel <span className={style.downloadIcon}></span></button>
          <p>*Для більш детального розрахунку звавантажте Excel.</p>
        </div>
      </div>
      <div className={style.orderDetails__commentToOrder}>
          <form name={"comment"}>
            <div className={style.orderDetails__commentToOrder_wrapper}>
              <textarea name={"comment"} id={"dsfsdf"} cols="30" rows="10"></textarea>
              <button type="submit">додати коментар до замовлення</button>
            </div>
          </form>
      </div>
      <div className={style.orderDetails__orderBtn}>
        <div>
          <button type="submit">замовити</button>
          <p>*Наш менеджер зв'яжеться з вами після замовлення для підтвердження деталей замовлення.</p>
        </div>
      </div>
    </div>
  )   
}

export default OrderDetails;
import style from './Order.module.scss';
import React from 'react';
import OrderItem from './OrderItem';

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
      stock: true,
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
      stock: true,
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
      stock: true,
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


const OrderList = () => {
  //const timestapm & const.log for test and convert date
  // const timestamp = Date.now(); // This would be the timestamp you want to format for test
  // console.log(new Intl.DateTimeFormat('UKR', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
  
  const orderDateHuman = (orderDate) => {
    return new Intl.DateTimeFormat('UKR', {year: 'numeric', month: 'long',day: '2-digit'}).format(orderDate); 
  }

  const itemblock = (data) => {
     
    //sort date at newest to oldest date    
    data.sort((a, b) => {
      return a.date - b.date
    }).reverse();
    
    return data.map(item => (
       <React.Fragment key={item.id}>
         <div className={style.order__lastDate}>{orderDateHuman(item.date)}</div>
         <OrderItem data={item} />
       </React.Fragment>
    ))
  }
  
  return(
    <>
      <div className={style.order__wrapper}>
        {itemblock(mockOrder)}
      </div>
    </>
  )
}

export default OrderList;
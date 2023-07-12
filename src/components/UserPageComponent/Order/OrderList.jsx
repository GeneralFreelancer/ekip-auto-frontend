import style from "./Order.module.scss";
import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

// const mockOrder = [
//   {
//     id: "1",
//     title: "Замовлення від 22 березня на 4500 $",
//     goods: [
//       {
//         id: "1",
//         category: "category",
//         title: "Назва товару",
//         description: "lorem",
//         options: [],
//         deliveryOptions: [],
//         SKU: "number12sdsd",
//         favorite: true,
//         price: [15000, 120],
//         minQuantity: 100,
//         stock: true,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 500,
//       },
//       {
//         id: "2",
//         category: "category",
//         title: "Назва товару",
//         description: "lorem",
//         options: [],
//         deliveryOptions: [],
//         SKU: "number12sdsd",
//         favorite: true,
//         price: [15000, 120],
//         minQuantity: 100,
//         stock: true,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 500,
//       },
//       {
//         id: "3",
//         category: "category",
//         title: "Назва товару",
//         description: "lorem",
//         options: [],
//         deliveryOptions: [],
//         SKU: "number12sdsd",
//         favorite: true,
//         price: [15000, 120],
//         minQuantity: 100,
//         stock: true,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 500,
//       },
//     ],
//     deliveryWeight: 105.6,
//     totalPrice: [100000, 20000],
//     paidStatus: true,
//     url: "/myprofile/order-history-details",
//     date: 1679497533000,
//   },
//   {
//     id: "2",
//     title: "Замовлення від 15 січьня на 4500 $",
//     goods: [
//       {
//         id: "1",
//         category: "category",
//         title: "Назва товару",
//         description: "lorem",
//         options: [],
//         deliveryOptions: [],
//         SKU: "number12sdsd",
//         favorite: true,
//         price: [15000, 120],
//         minQuantity: 100,
//         stock: true,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 500,
//       },
//       {
//         id: "2",
//         category: "category",
//         title: "Назва товару",
//         description: "lorem",
//         options: [],
//         deliveryOptions: [],
//         SKU: "number12sdsd",
//         favorite: true,
//         price: [15000, 120],
//         minQuantity: 100,
//         stock: true,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 500,
//       },
//       {
//         id: "3",
//         category: "category",
//         title: "Назва товару",
//         description: "lorem",
//         options: [],
//         deliveryOptions: [],
//         SKU: "number12sdsd",
//         favorite: true,
//         price: [15000, 120],
//         minQuantity: 100,
//         stock: true,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 500,
//       },
//     ],
//     deliveryWeight: 105.6,
//     totalPrice: [100000, 20000],
//     paidStatus: false,
//     url: "/myprofile/order-history-details",
//     date: 1673795133000,
//   },
//   {
//     id: "3",
//     title: "Замовлення від 22 лютого на 4500 $",
//     goods: [
//       {
//         id: "1",
//         category: "category",
//         title: "Назва товару",
//         description: "lorem",
//         options: [],
//         deliveryOptions: [],
//         SKU: "number12sdsd",
//         favorite: true,
//         price: [15000, 120],
//         minQuantity: 100,
//         stock: true,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 500,
//       },
//       {
//         id: "2",
//         category: "category",
//         title: "Назва товару",
//         description: "lorem",
//         options: [],
//         deliveryOptions: [],
//         SKU: "number12sdsd",
//         favorite: true,
//         price: [15000, 120],
//         minQuantity: 100,
//         stock: true,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 500,
//       },
//       {
//         id: "3",
//         category: "category",
//         title: "Назва товару",
//         description: "lorem",
//         options: [],
//         deliveryOptions: [],
//         SKU: "number12sdsd",
//         favorite: true,
//         price: [15000, 120],
//         minQuantity: 100,
//         stock: true,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 500,
//       },
//     ],
//     deliveryWeight: 105.6,
//     totalPrice: [100000, 20000],
//     paidStatus: false,
//     url: "/myprofile/order-history-details",
//     date: 1677078333000,
//   },
// ];

const OrderList = () => {
  //const timestapm & const.log for test and convert date
  // const timestamp = Date.now(); // This would be the timestamp you want to format for test
  // console.log(new Intl.DateTimeFormat('UKR', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
  const [orders, setOrders] = useState([]);

  const user = useSelector(selectedUser);

  const months = {
    "01": "СІЧЕНЯ",
    "02": "ЛЮТОГО",
    "03": "БЕРЕЗНЯ",
    "04": "КВІТНЯ",
    "05": "ТРАВНЯ",
    "06": "ЧЕРВНЯ",
    "07": "ЛИПНЯ",
    "08": "СЕРПНЯ",
    "09": "ВЕРЕСНЯ",
    10: "ЖОВТНЯ",
    11: "ЛИСТОПАДА",
    12: "ГРУДНЯ",
  };
  const orderDateHuman = (orderDate) => {
    const [year, month, day] = orderDate.split("T")[0].split("-");
    const formattedDate = `${parseInt(day, 10)} ${months[month]} ${year}`;
    return formattedDate;
    // return new Intl.DateTimeFormat("UKR", {
    //   year: "numeric",
    //   month: "long",
    //   day: "2-digit",
    // }).format(orderDate);
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/order-history`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(response.data.orderHistory);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, [user.token]);

  const itemblock = (data) => {
    //sort date at newest to oldest date
    data
      .sort((a, b) => {
        return a.createdAt - b.createdAt;
      })
      .reverse();
    return data.map((item) => (
      <React.Fragment key={item.id}>
        <div className={style.order__lastDate}>
          {/* {orderDateHuman(item.date).slice(0, -3)} */}
          {orderDateHuman(item.createdAt)}
        </div>
        <OrderItem data={item} />
      </React.Fragment>
    ));
  };

  return (
    <>
      <div className={style.order__wrapper}>{orders.length > 0 ? itemblock(orders) : <h1 style={{textAlign: 'center'}}>Нема замовлень</h1>}</div>
    </>
  );
};

export default OrderList;

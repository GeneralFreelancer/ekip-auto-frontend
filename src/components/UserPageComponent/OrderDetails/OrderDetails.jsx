import style from "./OrderDetails.module.scss";
import { useMediaPredicate } from "react-media-hook";
import React, { useEffect, useState } from "react";
import TableHead from "./TableHead/TableHead";
import TableHeadMiddle from "./TableHead/TableHeadMiddle";
import TableBody from "./TableBody/TableBody";
import TableBodyMiddle from "./TableBody/TableBodyMiddle";
import TableFooter from "./TableFooter/TableFooter";
import TableFooterMiddle from "./TableFooter/TableFooterMiddle";
import TableBodyMobile from "./TableBody/TableBodyMobile";
import TableFooterMobile from "./TableFooter/TableFooterMobile";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";
import {useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setProductsInCart } from "../../../redux/features/cartSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

// const mockOrder = [
//   {
//     id: "1",
//     title: "Замовлення від 22 березня на 4500",
//     goods: [
//       {
//         id: "1",
//         category: "category",
//         title: "Назва товару",
//         description: "lorem",
//         options: [],
//         deliveryOptions: [],
//         SKU: "number12sdsd",
//         favorite: false,
//         price: [15000, 120],
//         minQuantity: 100,
//         stock: false,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 100,
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
//         quantity: 100,
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
//         stock: false,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 100,
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
//     title: "Замовлення від 15 січьня на 4500",
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
//         quantity: 100,
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
//         quantity: 100,
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
//         stock: false,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 100,
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
//     title: "Замовлення від 22 лютого на 4500",
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
//         stock: false,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 100,
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
//         quantity: 100,
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
//         stock: false,
//         image: [
//           "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
//         ],
//         quantity: 100,
//       },
//     ],
//     deliveryWeight: 105.6,
//     totalPrice: [100000, 20000],
//     paidStatus: false,
//     url: "/myprofile/order-history-details",
//     date: 1677078333000,
//   },
// ];

const OrderDetails = () => {
  // const { goods } = mockOrder[0];

  const desktop = useMediaPredicate("(min-width: 1024px)");
  const middle = useMediaPredicate(
    "(min-width: 540px) and (max-width: 1023px)"
  );
  const mobile = useMediaPredicate("(max-width: 540px)");
  const [dataOrder, setdataOrder] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const user = useSelector(selectedUser);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/order-history/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setdataOrder(response.data.order.products);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, [user.token]);

  const remove = async(id, quantity) => {
    try {
      const response = await axios.put(
        `${baseUrl}/basket`,
        {
          product: id,
          number: quantity
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(setProductsInCart(response.data.basket.products));
    } catch (error) {
      console.error("Error:", error.message);
    }
    // let templateArr = dataMockOrder;

    // templateArr = [...templateArr].filter(item => item.id !== id);
    // console.log(templateArr);
    // setdataMockOrder(templateArr);
  };

  // change favorite state in DB
  const checkfavorite = (id) => {
    console.log(id);
    // let templateArr = dataMockOrder;

    // templateArr = [...templateArr].filter(item => (
    //   item.id === id ? !item.favorite : !item.favorite
    //   ));
    // setdataMockOrder(templateArr);
  };

  const changeQuantity = (id, btnType) => {
    console.log(id)
    if (btnType === "up") {
      setdataOrder(
        dataOrder.filter((item) =>
          item.id === id ? (item.quantity += item.minQuantity) : item.quantity
        )
      );
    }
    if (btnType === "down") {
      setdataOrder(
        dataOrder.filter((item) =>
          item.id === id && item.quantity > item.minQuantity ? item.quantity -= item.minQuantity : item.quantity
        )
      );
    } 
  };

  const sumUAH = dataOrder?.reduce((total, item) => {
    return total + item.number * item.product.priceUAH;
  }, 0);

  const sumUSD = dataOrder?.reduce((total, item) => {
    return total + item.number * item.product.priceUSD;
  }, 0);



  const leftComment = (event) => {
    event.preventDefault();
    !isActive ? setIsActive(true) : setIsActive(false);
  };
  return (
    <div className={style.orderDetails__wrapper}>
      {desktop && <TableHead />}
      <table className={style.orderDetails__table}>
        <thead>{middle && <TableHeadMiddle />}</thead>
        <tbody>
          {desktop && (
            <TableBody
              changeQuantity={changeQuantity}
              checkFavorire={checkfavorite}
              delete={remove}
              data={dataOrder}
            />
          )}
          {middle && (
            <TableBodyMiddle
              changeQuantity={changeQuantity}
              checkFavorire={checkfavorite}
              delete={remove}
              data={dataOrder}
            />
          )}
          {mobile && (
            <TableBodyMobile
              changeQuantity={changeQuantity}
              checkFavorire={checkfavorite}
              delete={remove}
              data={dataOrder}
            />
          )}
        </tbody>
        <tfoot>
          {desktop && <TableFooter sumUAH={sumUAH} sumUSD={sumUSD}  />}
          {middle && <TableFooterMiddle sumUAH={sumUAH} sumUSD={sumUSD} />}
          {mobile && <TableFooterMobile sumUAH={sumUAH} sumUSD={sumUSD} />}
        </tfoot>
      </table>

      {/* <div className={style.orderDetails__downloadOrder}>
        <div className={style.orderDetails__downloadOrder_wrapper}>
          <button>
            Cкачать Excel <span className={style.downloadIcon}></span>
          </button>
          <p>*Для більш детального розрахунку звавантажте Excel.</p>
        </div>
      </div>
      <div className={style.orderDetails__commentToOrder}>
        <form name={"comment"}>
          <div className={style.orderDetails__commentToOrder_wrapper}>
            {isActive && (
              <textarea
                name={"comment"}
                id={"dsfsdf"}
                cols="30"
                rows="10"
              ></textarea>
            )}
            <button
              onClick={(e) => {
                leftComment(e);
              }}
              className={isActive ? style.active : ""}
              type="submit"
            >
              додати коментар до замовлення
            </button>
          </div>
        </form>
      </div>
      <div className={style.orderDetails__orderBtn}>
        <div>
          <button type="submit">замовити</button>
          <p>
            *Наш менеджер зв'яжеться з вами після замовлення для підтвердження
            деталей замовлення.
          </p>
        </div>
      </div>
       */}
    </div>
  );
};

export default OrderDetails;

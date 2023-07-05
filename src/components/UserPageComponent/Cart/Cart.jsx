import style from "./Cart.module.scss";
import { useMediaPredicate } from "react-media-hook";
import { useEffect, useState } from "react";
import TableHead from "./TableHead/TableHead";
import TableHeadMiddle from "./TableHead/TableHeadMiddle";
import TableBody from "./TableBody/TableBody";
import TableBodyMiddle from "./TableBody/TableBodyMiddle";
import TableFooter from "./TableFooter/TableFooter";
import TableFooterMiddle from "./TableFooter/TableFooterMiddle";
import TableBodyMobile from "./TableBody/TableBodyMobile";
import TableFooterMobile from "./TableFooter/TableFooterMobile";
import { setProductsInCart } from "../../../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const mockItems = [
  {
    id: "1",
    category: "category",
    title: "Назва товаруНазва товаруНазва товару",
    description: "lorem",
    options: [],
    deliveryOptions: [],
    SKU: "number1212sdsd",
    favorite: false,
    price: [1000, 100],
    minQuantity: 100,
    multiplicity: 10,
    stock: true,
    image: [
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    ],
    quantity: 100,
  },
  {
    id: "2",
    category: "category",
    title: "Назва товару",
    description: "lorem",
    options: [],
    deliveryOptions: [],
    SKU: "number12sdsd",
    favorite: true,
    price: [15000, 120],
    minQuantity: 100,
    multiplicity: 100,
    stock: true,
    image: [
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    ],
    quantity: 100,
  },
  {
    id: "3",
    category: "category",
    title: "Назва товару",
    description: "lorem",
    options: [],
    deliveryOptions: [],
    SKU: "number11sdsd",
    favorite: false,
    price: [10000, 160],
    minQuantity: 100,
    multiplicity: 100,
    stock: true,
    image: [
      "https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/ab4d8dc6-f0ca-439d-eda2-79b95d74e800/16x9",
    ],
    quantity: 100,
  },
];

const Cart = () => {
  const desktop = useMediaPredicate("(min-width: 1024px)");
  const middle = useMediaPredicate(
    "(min-width: 540px) and (max-width: 1023px)"
  );
  const mobile = useMediaPredicate("(max-width: 540px)");
  const [dataMockItems, setDataMockItems] = useState(mockItems);
  const [isActive, setIsActive] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductsFromCart = async () => {
      try {
        const response = await axios.get(`${baseUrl}/basket`);
        console.log(response);
        setDataMockItems(response.data.products);
        dispatch(setProductsInCart(response.data.products));
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    getProductsFromCart();
  }, []);

  //remover function delete items
  const remove = async (id) => {
    const arrayWithoutDeletedProduct = dataMockItems.filter(
      (item) => item.id !== id
    );
    // token
    try {
      const response = await axios.post(
        `${baseUrl}/basket`,
        arrayWithoutDeletedProduct
      ); 
      setDataMockItems(response.data.products);
      dispatch(setProductsInCart(response.data.products));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // change favorite state in DB
  const checkfavorite = async(id) => {
    try {
      setIsFavorite(!isFavorite);
      const response = await axios.patch("/user/favorite", { productId: id });
      // token
      // response = user.favoriteProducts;
      // dispatch(user);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const changeQuantity = async (id, btnType) => {
    console.log(btnType);
    if (btnType === "up") {
      setDataMockItems(
        dataMockItems.filter((item) =>
          item.id === id ? (item.quantity += item.minQuantity) : item.quantity
        )
      );
    }
    if (btnType === "down") {
      setDataMockItems(
        dataMockItems.filter((item) =>
          item.id === id && item.quantity > item.minQuantity
            ? (item.quantity -= item.minQuantity)
            : item.quantity
        )
      );
    }
    // token
    try {
      const response = await axios.put(`${baseUrl}/basket`, {
        product: id,
        // number: quantity,??
      });
      setDataMockItems(response.data.products);
      dispatch(setProductsInCart(response.data.products));
    } catch (error) {
      console.error("Error:", error.message);
    }
 
    // dispatch(updateQuantity({ id, quantity }));
  };

  const leftComment = (event) => {
    event.preventDefault();
    !isActive ? setIsActive(true) : setIsActive(false);
  };
  return (
    <div className={style.cart__wrapper}>
      {desktop && <TableHead />}
      <table className={style.cart__table}>
        <thead>{middle && <TableHeadMiddle />}</thead>
        <tbody>
          {desktop && (
            <TableBody
              changeQuantity={changeQuantity}
              checkFavorire={checkfavorite}
              delete={remove}
              data={dataMockItems}
            />
          )}
          {middle && (
            <TableBodyMiddle
              changeQuantity={changeQuantity}
              checkFavorire={checkfavorite}
              delete={remove}
              data={dataMockItems}
            />
          )}
          {mobile && (
            <TableBodyMobile
              changeQuantity={changeQuantity}
              checkFavorire={checkfavorite}
              delete={remove}
              data={dataMockItems}
            />
          )}
        </tbody>
        <tfoot>
          {desktop && <TableFooter />}
          {middle && <TableFooterMiddle />}
          {mobile && <TableFooterMobile />}
        </tfoot>
      </table>
      <div className={style.cart__downloadOrder}>
        <div className={style.cart__downloadOrder_wrapper}>
          <button>
            Cкачать Excel <span className={style.downloadIcon}></span>
          </button>
          <p>*Для більш детального розрахунку звавантажте Excel.</p>
        </div>
      </div>
      <div className={style.cart__commentToOrder}>
        <form name={"comment"}>
          <div className={style.cart__commentToOrder_wrapper}>
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
      <div className={style.cart__orderBtn}>
        <div>
          <button type="submit">замовити</button>
          <p>
            *Наш менеджер зв'яжеться з вами після замовлення для підтвердження
            деталей замовлення.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

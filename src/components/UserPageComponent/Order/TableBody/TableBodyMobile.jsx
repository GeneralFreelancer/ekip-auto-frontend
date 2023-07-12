import style from "./TableBody.module.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Pen } from "../../../../assets/svg/edit.svg";
import { ReactComponent as Cross } from "../../../../assets/svg/cross.svg";
import { ReactComponent as Tick } from "../../../../assets/svg/Tick.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../../redux/features/userSlice";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const TableBodyMobile = (props) => {
  const { id, name, products, totalPrice, weight, paidStatus } = props.data;
  const [isEdite, setEdite] = useState(false);
  const [title, setTitle] = useState(name);
  // const [quantity, setQuantity] = useState(500);
  const user = useSelector(selectedUser);

  let sumUAH = props.data.products?.reduce((total, item) => {
    return total + item.number * item.product.priceUAH;
  }, 0);
  let sumUSD = props.data.products?.reduce((total, item) => {
    return total + item.number * item.product.priceUSD;
  }, 0);

  const handleSaveClick = async (id, name) => {
    setEdite(false);
    try {
      const response = await axios.put(
        `${baseUrl}/order-history/name`,
        { id, name },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCancelClick = () => {
    setTitle(name);
    setEdite(false);
  };

  const redirect = (id) => {
    console.log(id);
  };
  const editableInputTypes = () => {
    !isEdite ? setEdite(true) : setEdite(false);
  };

  return (
    <React.Fragment key={id}>
      <tr>
        <th colSpan={2} className={style.th_head}>
          позицій
        </th>
      </tr>
      <tr>
        <td colSpan={2} className={style.order__table_number}>
          {products.length}
        </td>
      </tr>
      <tr>
        <th colSpan={2} className={style.th_head}>
          зображення
        </th>
      </tr>
      <tr>
        <td colSpan={2} className={style.order__table_picture}>
          <div
            className={style.order__table_picture}
            style={{
              backgroundImage: `url(${products[0].product.pictures[0]})`,
            }}
          ></div>
        </td>
      </tr>
      <tr>
        <th colSpan={2} className={style.th_head}>
          назва замовлення
        </th>
      </tr>
      <tr>
        <td colSpan={2} className={style.order__table_title}>
          <div className={style.order__table_title_row1}>
            {!isEdite ? (
              <>
                <h2>{title}</h2>
                <Pen
                  onClick={() => {
                    editableInputTypes(id);
                  }}
                />
              </>
            ) : (
              <>
                <input type="text" value={title} onChange={handleChange} />
                <button
                  className={style.productItem_btn}
                  onClick={handleCancelClick}
                >
                  <Cross />
                </button>
                <button
                  className={style.productItem_btn}
                  onClick={() => handleSaveClick(id, title)}
                >
                  <Tick />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
      <tr>
        <th>вага замовлення</th>
        <th>сплачено</th>
      </tr>
      <tr>
        <td className={style.order__table_weight}>
          <div>
            <p className={style.weight}>{weight} кг.</p>
          </div>
        </td>
        <td className={style.order__table_paid}>
          <div
            className={paidStatus ? style.paidIconTrue : style.paidIconFalse}
          ></div>
        </td>
      </tr>
      <tr>
        <th colSpan={2}> загальна ціна</th>
      </tr>
      <tr>
        <td colSpan={2} className={style.order__table_summaryPrice}>
          <div>
            <p className={style.nationalSummary}>{sumUAH} &#8372;</p>
          </div>
          <div>
            <p className={style.internationSummary}>{sumUSD} &#65284;</p>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={2} className={style.order__table_riderect_middle}>
        <NavLink to={`/myprofile/order-history-details/${id}`}>
            <span
              id={id}
              className={style.iconRiderect}
              // onClick={() => {
              //   redirect(id);
              // }}
            ></span>
          </NavLink>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default TableBodyMobile;

import style from "./TableBody.module.scss";

const TableBody = (props) => {

  const orderDateHuman = (orderDate) => {
    const date = new Date(orderDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
    // return new Intl.DateTimeFormat("UKR", {
    //   year: "numeric",
    //   month: "numeric",
    //   day: "2-digit",
    // }).format(orderDate);
  };

  return props.data?.map((item) => (
    <tr key={item._id}>
      <td className={style.share__table_number}>{orderDateHuman(item.createdAt)}</td>
      <td className={style.share__table_title}>
        <div className={style.share__table_title_row1}>
          <h2>
            {item.user?.firstName} {item.user?.lastName}
          </h2>
        </div>
      </td>
      <td className={style.share__table_picture}>
        <div
          className={style.share__table_picture_item}
          style={{ backgroundImage: `url(${item.product?.pictures[0]})` }}
        ></div>
      </td>
      <td className={style.share__table_delete}>
        <span
          id={item._id}
          onClick={() => {
            props.delete(item._id);
          }}
          className={style.icon}
        ></span>
      </td>
    </tr>
  ));
};

export default TableBody;

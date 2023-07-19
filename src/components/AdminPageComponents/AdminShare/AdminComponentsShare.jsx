import style from "./Share.module.scss";
import { useMediaPredicate } from "react-media-hook";
import { useEffect, useState } from "react";
import TableHead from "./TableHead/TableHead";
import TableHeadMiddle from "./TableHead/TableHeadMiddle";
import TableBody from "./TableBody/TableBody";
import TableBodyMiddle from "./TableBody/TableBodyMiddle";
import TableBodyMobile from "./TableBody/TableBodyMobile";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

const AdminComponentsShare = () => {
  const desktop = useMediaPredicate("(min-width: 1024px)");
  const middle = useMediaPredicate(
    "(min-width: 540px) and (max-width: 1023px)"
  );
  const mobile = useMediaPredicate("(max-width: 540px)");
  const [dataItems, setDataItems] = useState([]);

  const user = useSelector(selectedUser);

  useEffect(() => {
    const handleGoodsRequest = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product-request`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setDataItems(response.data.productRequests);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    handleGoodsRequest()
  }, [user.token]);

  //  not work
  const remove = async(id) => {
    try {
      const response = await axios.delete(`${baseUrl}/product-request/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setDataItems(response.data.productRequests);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // change favorite state in DB
  const access = (id) => {
    console.log(id);
    // let templateArr = dataMockItems;
    // templateArr = [...templateArr].filter(item => (
    //   item.id === id ? !item.favorite : !item.favorite
    //   ));
    // setDataMockItems(templateArr);
  };

  return (
    <>
      <div className={style.share__wrapper}>
        <div className={style.share__blockTitle}>
          доступ до залишків на складі
        </div>
        {desktop && <TableHead />}
        <table className={style.share__table}>
          <thead>{middle && <TableHeadMiddle />}</thead>
          <tbody>
            {desktop && (
              <TableBody access={access} delete={remove} data={dataItems} />
            )}
            {middle && (
              <TableBodyMiddle
                access={access}
                delete={remove}
                data={dataItems}
              />
            )}
            {mobile && (
              <TableBodyMobile
                access={access}
                delete={remove}
                data={dataItems}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminComponentsShare;

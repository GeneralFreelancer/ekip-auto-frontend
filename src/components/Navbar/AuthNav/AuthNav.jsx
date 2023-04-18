import style from "./AuthNav.module.scss";
import { ReactComponent as User } from "../../../assets/svg/authNav/user.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../features/userSlice";

const AuthNav = (props) => {
  const [showModal, setShowModal] = useState(false);
  // let [authUser, setAuthUser] = useState(false);
  const user = useSelector(selectedUser);

  const onClick = () => {
    if (user.isLoggedIn) {
      setShowModal((prevState) => !prevState);
      // setShowModal((prevState) => {
      //   setShowModal(!prevState);
      // });
    } else {
    }
    // console.log("click");
    // setShowModal((prevState) => {
    //   setShowModal(!prevState);
    // });
  };

  return (
    <>
      <div className={!showModal ? style.userWrapper : style.userWrapperOpen}>
        <User
          className={!showModal ? style.user : style.userOpen}
          onClick={() => {
            onClick();
            props.onShowModal();
          }}
        />
        {showModal && (
          <ul className={style.list}>
            <Link className={style.item} to={"#"}>
              <li>Моя сторінка</li>
            </Link>
            <Link className={style.item} to={"#"}>
              <li>Замовлення</li>
            </Link>
            <Link className={style.item} to={"#"}>
              <li>Вийти</li>
            </Link>
          </ul>
        )}
      </div>
      {user.isLoggedIn && <p style={{color:'white'}}>{user.currentUser.email}</p>}
    </>
  );
};

export default AuthNav;

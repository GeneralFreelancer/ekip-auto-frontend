import style from "./AuthNav.module.scss";
import { ReactComponent as User } from "../../../assets/svg/authNav/user.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/userSlice";

const AuthNav = (props) => {
  const [showModal, setShowModal] = useState(false);
  // let [authUser, setAuthUser] = useState(false);
  const user = useSelector(selectedUser);

  const dispatch = useDispatch();

  const onClick = () => {
    if (user.isLoggedIn || user.isRegistered) {
      setShowModal((prevState) => !prevState);
    }
    // console.log("click");
    // setShowModal((prevState) => {
    //   setShowModal(!prevState);
    // });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setShowModal(false);
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
              <li onClick={handleLogout}>Вийти</li>
            </Link>
          </ul>
        )}
      </div>
      {user.isLoggedIn && <p style={{ color: "white" }}>Тимур</p>}
      {user.isRegistered && (
        <Link style={{ color: "red", textDecoration: "none" }} to={"#"}>
          Завершити <br></br> реестрацію
        </Link>
      )}
    </>
  );
};

export default AuthNav;

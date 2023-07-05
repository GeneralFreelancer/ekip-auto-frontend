import style from "./AuthNav.module.scss";
import { ReactComponent as User } from "../../../assets/svg/authNav/user.svg";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const AuthNav = (props) => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(selectedUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wrapperAuthRef = useRef(null);

  useEffect(() => {
    const handleClickWindow = (e) => {
      if (showModal === true) {
        if (
          wrapperAuthRef.current &&
          !wrapperAuthRef.current.contains(e.target)
        ) {
          setShowModal(false);
        }
      }
    };

    if (showModal === true) {
      window.addEventListener("click", handleClickWindow);
    } else {
      window.removeEventListener("click", handleClickWindow);
    }
    // Повернути функцію очищення ефекту
    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, [showModal]);

  const onClick = () => {
    if (user.isLoggedIn || user.isRegisteredConfirmed) {
      setShowModal((prevState) => !prevState);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setShowModal(false);
    navigate("/");
    // Test
    localStorage.removeItem("role");
  };

  return (
    <div className={style.userWrapper_block} ref={wrapperAuthRef}>
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
            <Link className={style.item} to={"/myprofile/mydata"}>
              <li>Моя сторінка</li>
            </Link>
            <Link className={style.item} to={"/myprofile/order-history"}>
              <li>Замовлення</li>
            </Link>
            <Link className={style.item}>
              <li onClick={handleLogout}>Вийти</li>
            </Link>
            {localStorage.getItem("role") === 'admin' && (
              <Link className={style.item} to={"/myprofile/share-stocks"}>
                <li>Залишки товару</li>
              </Link>
            )}
          </ul>
        )}
      </div>
      {(user.isLoggedIn || user.isDataFullFilled) && (
        <p className={style.userLog}>{user?.userdata?.firstName}</p>
      )}
      {user.isRegisteredConfirmed && !user.isDataFullFilled && (
        <Link className={style.userRegister} to={"/myprofile/mydata"}>
          Заповнити <br></br> дані
        </Link>
      )}
    </div>
  );
};

export default AuthNav;

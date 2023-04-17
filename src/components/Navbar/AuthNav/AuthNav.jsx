import style from "./AuthNav.module.scss";
import { ReactComponent as User } from "../../../assets/svg/authNav/user.svg";
import { useState,} from "react";
import { Link } from 'react-router-dom'

const AuthNav = () => {
  const [showModal, setShowModal] = useState(false);
  const [authUser, setAuthUser] = useState(true);

  const onClick = () => {
    if (authUser) {
         setShowModal(prevState => { setShowModal(!prevState) })
    }else{
    
    }

    console.log('click')
    setShowModal((prevState) => {
      setShowModal(!prevState);
    });
  };

  return (
    <>
      <div className={!showModal ? style.userWrapper : style.userWrapperOpen}>
        <User
          className={!showModal ? style.user : style.userOpen}
          onClick={onClick}
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
        {authUser && <p>{authUser.name}</p>}
      </div>
    </>
  );
};

export default AuthNav;

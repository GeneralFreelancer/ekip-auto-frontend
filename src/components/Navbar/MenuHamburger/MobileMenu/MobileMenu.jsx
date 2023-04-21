import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import s from "./MobileMenu.module.scss";

import NavbarLink from "../../NavbarLinkLogo/NavbarLink";
import Accordion from "./Accordion";
import Logo from "../../NavbarLinkLogo/Logo/Logo";

import { ReactComponent as Cross } from "../../../../assets/svg/cross.svg";
import { ReactComponent as UserMob } from "../../../../assets/svg/authNav/user.svg";

import { selectedUser } from "../../../../redux/features/userSlice";

const MobileMenu = (props) => {
  console.log(props.onHideMobModal);
  const user = useSelector(selectedUser);
  const navigate = useNavigate();

  const onClickNavigate = () => {
    if (user.isLoggedIn || user.isRegistered) {
      navigate("/myprofile");
    }
  };

  return (
    <div className={s.mobile_modal}>
      <div className={s.mobile_modal_header}>
        <div
          className={(user.isLoggedIn || user.isRegistered) && s.mobile_cross}
        >
          <Cross className={s.cross} onClick={props.onHideMobModal} />
        </div>
        <Logo />
        <div className={s.userMob_block}>
          <UserMob
            className={s.userMob}
            onClick={() => {
              onClickNavigate();
              props.onShowModal();
            }}
          />
          {user.isLoggedIn && <p style={{ color: "white" }}>Тимурsdfsd</p>}
          {user.isRegistered && (
            <Link style={{ color: "red", textDecoration: "none" }} to={"#"}>
              Завершити
            </Link>
          )}
        </div>
      </div>
      <NavbarLink styleItem={"logo_navlink_mobile"} />
      <Accordion />
    </div>
  );
};

export default MobileMenu;

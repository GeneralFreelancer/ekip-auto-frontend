import React from "react";
import s from "./MobileMenu.module.scss";
import NavbarLink from "../../NavbarLinkLogo/NavbarLink/NavbarLink";
import AuthNav from "../../AuthNav/AuthNav";
import { ReactComponent as Cross } from "../../../../assets/svg/cross.svg";
import Logo from "../../NavbarLinkLogo/Logo/Logo";

const MobileMenu = (props) => {
  return (
    <div className={s.mobile_modal}>
      <div className={s.mobile_modal_header}>
        <div className={s.mobile_cross} onClick={() => props.onClick()}>
          <Cross className={s.cross} />
        </div>
        <Logo />
        <AuthNav onClick={() => props.onShowModal()} />
      </div>
      <NavbarLink styleItem={"logo_navlink_mobile"} />
    </div>
  );
};

export default MobileMenu;

import React from "react";
import s from "./ModalWindow.module.scss";
import ReactDOM from "react-dom";
import { ReactComponent as Cross } from '../../assets/svg/cross.svg';


const Backdrop = () => {
  return <div className={s.backdrop}></div>;
};

const Modal = (props) => {
  return (
    <div className={s.modal}>
      <div className={s.content}>{props.children}</div>
      <div className={s.btn_close} onClick={props.onHideModal}>
        <Cross />
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const ModalWindow = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        portalElement
      )}
      {ReactDOM.createPortal(<Modal onHideModal={props.onHideModal} >{props.children}</Modal>, portalElement)}
    </>
  );
};

export default ModalWindow;

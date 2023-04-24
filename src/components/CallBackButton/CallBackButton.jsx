import React, { useState } from "react";
import { ReactComponent as Phone } from "../../assets/svg/phone-call.svg";
import s from "./CallbackButton.module.scss";
import { ReactComponent as Send } from "../../assets/svg/send.svg";
import { PatternFormat } from "react-number-format";

const CallBackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+38 (0__) ___ __ __");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    console.log(phoneNumber);
    setPhoneNumber("+38 (0__) ___ __ __");
  };

  const changePhoneHandler = (e) => {
    const cleanedValue = e.target.value.replace(/\D/g, "");

    setPhoneNumber(cleanedValue);
  };

  return (
    <>
      <div
        className={s.callButton}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <Phone />
      </div>
      {isOpen && (
        <div className={s.callBackModal}>
          <div className={s.callBackModalContent}>
            <p style={{ marginLeft: "10px" }}>Продукція:</p>
            <p>+38 (050) 395 31 45</p>
            <p style={{ marginLeft: "10px" }}>Сайт</p>
            <p>+38 (095) 101 50 79</p>
            <hr></hr>
            <p style={{ marginLeft: "10px" }}
            >Зателефонувати мені:</p>
            <form onSubmit={handleSubmit}>
              <PatternFormat
                // type="tel"
                id="phone"
                name="phone"
                format="+38 (0##) ### ## ##"
                allowEmptyFormatting
                mask="_"
                className={s.callBackModal_input}
                onChange={changePhoneHandler}
                // value={phoneNumber}
              />
              <button className={s.callBackModal_btn} type="submit">
                <Send />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CallBackButton;

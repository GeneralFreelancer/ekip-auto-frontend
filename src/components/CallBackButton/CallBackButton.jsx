import React, { useState } from "react";
import { ReactComponent as Phone } from "../../assets/svg/phone-call.svg";
import s from "./CallbackButton.module.scss";

const CallBackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+38 (0__) ___ __ __');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    console.log(phoneNumber);
    setPhoneNumber('+38 (0__) ___ __ __');
  };

  const changePhoneHandler = (e) => {
    const cleanedValue = e.target.value.replace(/\D/g, '');
    // let formattedValue = '+38 (0__) ___ __ __';
    // for (let i = 0; i < cleanedValue.length && i < 8; i++) {
    //   formattedValue = formattedValue.replace('_', cleanedValue[i]);
    // }

    setPhoneNumber(cleanedValue);
  
  };

  return (
    <>
      <div className={s.callButton} onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
        <Phone />
      </div>
      {isOpen && (
        <div className={s.callBackModal}>
          <div className={s.callBackModalContent}>
            <p style={{marginLeft:'10px'}}>Продукція:</p>
            <p>+38 (050) 395 31 45</p>
            <p style={{marginLeft:'10px'}}>Сайт</p>
            <p>+38 (095) 101 50 79</p>
            <br></br>
            <p style={{marginLeft:'10px'}}>Зателефонувати мені:</p>
            <form onSubmit={handleSubmit}>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={s.callBackModal_input}
                onChange={changePhoneHandler}
                value={phoneNumber}
              />
              <button  className={s.callBackModal_btn}type="submit">О</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CallBackButton;

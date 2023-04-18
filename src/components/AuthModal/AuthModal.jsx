import React, { useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import LoginTab from "./LoginTab";
import RegisterTab from "./RegisterTab";
import s from "./AuthModal.module.scss";
import StartTimer from "./StartTimer";

const AuthModal = (props) => {
  const [activeTab, setActiveTab] = useState("login");
  const [registrationSuccess, setRegistrationSuccess ] = useState(false);

  const handleFormSubmit = (isSubmitted) => {
    setRegistrationSuccess(isSubmitted);
    localStorage.setItem("authSuccess", isSubmitted); // LocalStorage
  }

  const handleTabChange = (tab) => setActiveTab(tab);

  const renderRegistrationSuccess = () => {
    return (
      <div className={s.modalRegistSuccess}>
        <h1>Дякуємо за реєстрацію!</h1>
        <div className={s.form_hr2}></div>
        <div>
          <p>
            Ми вислали Вам лист на пошту для підтвердження веддених даних.
            <br></br>Щоб продовжити перейдіть за посиланням на пошті.
          </p>
          <p>
            Якщо лист не прийшов протягом хвилини, <br></br>то натисніть на
            відпривити знову: <StartTimer/>
          </p>
          <div className={s.modalRegistSuccess_send}>
            <button>Відправити знову</button>
          </div>
        </div>

        <div className={s.modalRegistSuccess_btn}>
          <button onClick={props.onHideModal}>Закрити</button>
        </div>
      </div>
    );
  };


  return (
    <>
      <ModalWindow onHideModal={props.onHideModal}>
        {registrationSuccess ? (
          renderRegistrationSuccess()
        ) : (
          <div>
            <div className={s.modal_tabs}>
              <div
                className={`${s.modal_tab} ${
                  activeTab === "login" ? s.modal_tab_active1 : ""
                }`}
                onClick={() => handleTabChange("login")}
              >
                Увійти
              </div>
              <div
                className={`${s.modal_tab} ${
                  activeTab === "register" ? s.modal_tab_active2 : ""
                }`}
                onClick={() => handleTabChange("register")}
              >
                Зареєструватися
              </div>
            </div>

            {activeTab === "login" ? (
              <LoginTab onSubmit={props.onHideModal}/>
            ) : (
              <RegisterTab onSubmit={handleFormSubmit} />
            )}
          </div>
        )}
      </ModalWindow>
    </>
  );
};

export default AuthModal;

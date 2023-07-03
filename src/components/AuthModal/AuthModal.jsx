import React, { useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import LoginTab from "./LoginTab";
import RegisterTab from "./RegisterTab";
import s from "./AuthModal.module.scss";
import StartTimer from "./StartTimer";
import { useSelector } from "react-redux";
import { selectedUser } from "../../redux/features/userSlice";
import axios from "axios";

const AuthModal = (props) => {
  const [activeTab, setActiveTab] = useState("login");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const user = useSelector(selectedUser);

  const handleFormSubmit = (isSubmitted) => {
    setRegistrationSuccess(isSubmitted);
  };

  const resendVerificationEmail = async () => {
    try {
      await axios.post("http://localhost:5502/user/verification-email", {
        email: user.userdata.email,
      });
      console.log("Verification email sent successfully");
    } catch (error) {
      console.log("Error resending verification email:", error.message);
    }
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const renderRegistrationSuccess = () => {
    if (!user.isRegisteredConfirmed) {
      resendVerificationEmail();
    }
    return (
      <div className={s.modalRegistSuccess}>
        <h1>Дякуємо за реєстрацію!</h1>
        <div className={s.form_hr2}></div>
        <div>
          <p>
            Ми вислали Вам лист на пошту для підтвердження введених даних.
            <br></br>Щоб продовжити перейдіть за посиланням на пошті.
          </p>
          <p>
            Якщо лист не прийшов протягом хвилини, <br></br>то натисніть на
            відпривити знову: <StartTimer />
          </p>
          <div className={s.modalRegistSuccess_send}>
            <button onClick={resendVerificationEmail}>Відправити знову</button>
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
        {registrationSuccess ||
        (user.isRegistered && !user.isRegisteredConfirmed) ? (
          renderRegistrationSuccess()
        ) : (
          <div>
            <div className={s.modal_tabs}>
              <div
                className={`${s.modal_tab1} ${
                  activeTab === "login" ? s.modal_tab_active : ""
                }`}
                onClick={() => handleTabChange("login")}
              >
                Увійти
              </div>
              <div
                className={`${s.modal_tab2} ${
                  activeTab === "register" ? s.modal_tab_active : ""
                }`}
                onClick={() => handleTabChange("register")}
              >
                Зареєструватися
              </div>
            </div>

            {activeTab === "login" ? (
              <LoginTab onSubmit={props.onHideModal} />
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

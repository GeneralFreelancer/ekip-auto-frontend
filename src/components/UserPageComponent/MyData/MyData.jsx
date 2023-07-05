import React, { useState } from "react";
import s from "./MyData.module.scss";
import { useDispatch } from "react-redux";
import { PatternFormat } from "react-number-format";
import TextBlock from "../TextBlock/TextBlock";
import { fullUserRegistered } from "../../../redux/features/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

const MyData = () => {
  const [dataForm, setDataForm] = useState({
    firstName: "",
    lastName: "",
    secondName: "",
    phone: "",
    email: "",
    city: "",
    street: "",
    extraInfo: "",
  });

  const [passForm, setPassForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [dataErrors, setDataErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    street: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isBtnChangeDisabled, setIsBtnChangeDisabled] = useState(true);
  const user = useSelector(selectedUser);
  const dispatch = useDispatch();

  const validateChangeForm = (name, value) => {
    let errors = { ...dataErrors };
    switch (name) {
      case "firstName":
        errors.firstName = isValidData(value);
        break;
      case "lastName":
        errors.lastName = isValidData(value);
        break;
      case "phone":
        errors.phone = isValidData(value);
        break;
      case "email":
        errors.email = isValidEmail(value);
        break;
      case "city":
        errors.city = isValidData(value);
        break;
      case "street":
        errors.street = isValidData(value);
        break;
      case "newPassword":
        errors.newPassword = isValidData(value);
        break;
      case "confirmPassword":
        errors.confirmPassword = isValidConfirmPassword(value);
        break;
      default:
        break;
    }
    setDataErrors(errors);
  };

  function isValidEmail(value) {
    if (!value) {
      return "Введіть Email";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return "Email введено неправильно";
    }
  }

  function isValidData(value) {
    if (!value) {
      return "Введіть дані";
    }
  }

  function isValidConfirmPassword(value) {
    if (passForm.newPassword !== value) {
      return "Паролі не співпадають";
    }
  }

  const changeDataHandler = (event) => {
    setDataForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

    validateChangeForm(event.target.name, event.target.value);
    if (
      dataForm.firstName &&
      dataForm.lastName &&
      dataForm.phone &&
      dataForm.email &&
      dataForm.city &&
      dataForm.street
    ) {
      setIsButtonDisabled(false);
    }
  };

  const submitChangeHandler = async (e) => {
    e.preventDefault();
    if (
      dataForm.firstName &&
      dataForm.lastName &&
      dataForm.phone &&
      dataForm.email &&
      dataForm.city &&
      dataForm.street
    ) {
      setIsButtonDisabled(false);
      setDataForm({
        firstName: "",
        lastName: "",
        secondName: "",
        phone: "",
        email: "",
        city: "",
        street: "",
        extraInfo: "",
      });
      setIsButtonDisabled(true);
      try {
        const response = await axios.put(
          `${baseUrl}/user/user-data`,
          {
            ...dataForm,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        dispatch(fullUserRegistered({ ...response.data }));

        setDataForm({
          email: "",
          password: "",
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const changePasswordHandler = (e) => {
    setPassForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    validateChangeForm(e.target.name, e.target.value);
    if (passForm.newPassword && passForm.confirmPassword) {
      setIsBtnChangeDisabled(false);
      dispatch(
        fullUserRegistered({
          newPassword: passForm.newPassword,
        })
      );
    }
  };

  const submitPasswordHandler = (e) => {
    e.preventDefault();
    if (passForm.newPassword === passForm.confirmPassword) {
      console.log(passForm);
      setIsBtnChangeDisabled(false);
      setPassForm({
        newPassword: "",
        confirmPassword: "",
      });
      setIsBtnChangeDisabled(true);
    }
  };

  return (
    <>
      <TextBlock />
      <div className={s.form_content}>
        <form>
          <div className={s.form_block}>
            <div className={s.form_group}>
              <label>Ім'я: *</label>
              <input
                type="text"
                name="firstName"
                className={`${s.form_input} ${
                  dataErrors.firstName ? s.input_error : ""
                }`}
                value={dataForm.firstName}
                onChange={changeDataHandler}
              />
              {dataErrors.name && (
                <div className={s.error_message}>{dataErrors.name}</div>
              )}
            </div>
            <div className={s.form_group}>
              <label>Прізвище: *</label>
              <input
                type="text"
                name="lastName"
                className={`${s.form_input} ${
                  dataErrors.lastName ? s.input_error : ""
                }`}
                value={dataForm.lastName}
                onChange={changeDataHandler}
              />
              {dataErrors.lastName && (
                <div className={s.error_message}>{dataErrors.lastName}</div>
              )}
            </div>
            <div className={s.form_group}>
              <label>По батькові:</label>
              <input
                type="text"
                name="secondName"
                className={s.form_input}
                value={dataForm.secondName}
                onChange={changeDataHandler}
              />
            </div>
          </div>

          <div className={s.form_block}>
            <div className={s.form_group}>
              <label>Номер телефону: *</label>
              <PatternFormat
                name="phone"
                format="+38 (0##) ### ## ##"
                value={dataForm.phone}
                allowEmptyFormatting
                mask="_"
                className={s.form_input}
                onChange={changeDataHandler}
              />
              {dataErrors.phone && (
                <div className={s.error_message}>{dataErrors.phone}</div>
              )}
            </div>

            <div className={s.form_group}>
              <label>Email: *</label>
              <input
                type="email"
                name="email"
                className={`${s.form_input} ${
                  dataErrors.email ? s.input_error : ""
                }`}
                value={dataForm.email}
                onChange={changeDataHandler}
              />
              {dataErrors.email && (
                <div className={s.error_message}>{dataErrors.email}</div>
              )}
            </div>
          </div>

          <div className={s.form_block}>
            <div className={s.form_group}>
              <label>Місто доставки: *</label>
              <input
                type="text"
                name="city"
                className={`${s.form_input} ${
                  dataErrors.city ? s.input_error : ""
                }`}
                value={dataForm.city}
                onChange={changeDataHandler}
              />
              {dataErrors.city && (
                <div className={s.error_message}>{dataErrors.city}</div>
              )}
            </div>
            <div className={s.form_group}>
              <label>Адреса доставки: *</label>
              <input
                type="text"
                name="street"
                className={`${s.form_input} ${
                  dataErrors.street ? s.input_error : ""
                }`}
                value={dataForm.street}
                onChange={changeDataHandler}
              />
              {dataErrors.street && (
                <div className={s.error_message}>{dataErrors.street}</div>
              )}
            </div>
          </div>

          <div className={s.form_block}>
            <div className={s.form_group}>
              <label>Додаткова інформація доставки:</label>
              <textarea
                type="text"
                name="extraInfo"
                className={s.form_input}
                value={dataForm.extraInfo}
                onChange={changeDataHandler}
                placeholder="Тут можна додати більш детальну інформацію про адресу доставки..."
              />
            </div>
          </div>
        </form>

        <form>
          <div className={s.form_block}>
            <div className={s.form_group}>
              <label>Новий пароль:</label>
              <input
                type="password"
                name="newPassword"
                className={`${s.form_input} ${
                  dataErrors.newPassword ? s.input_error : ""
                }`}
                value={passForm.newPassword}
                onChange={changePasswordHandler}
              />
              {dataErrors.newPassword && (
                <div className={s.error_message}>{dataErrors.newPassword}</div>
              )}
            </div>
            <div className={s.form_group}>
              <label>Підтвердити пароль:</label>
              <input
                type="password"
                name="confirmPassword"
                className={`${s.form_input} ${
                  dataErrors.confirmPassword ? s.input_error : ""
                }`}
                value={passForm.confirmPassword}
                onChange={changePasswordHandler}
              />
              {dataErrors.confirmPassword && (
                <div className={s.error_message}>
                  {dataErrors.confirmPassword}
                </div>
              )}
            </div>
            <div
              className={
                dataErrors.confirmPassword || dataErrors.newPassword
                  ? s.form_change_btn_fl
                  : s.form_change_btn
              }
            >
              <button
                type="submit"
                onClick={submitPasswordHandler}
                disabled={isBtnChangeDisabled}
              >
                Змінити
              </button>
            </div>
          </div>
        </form>

        <div className={s.form_submit_btn}>
          <button
            type="submit"
            onClick={submitChangeHandler}
            disabled={isButtonDisabled}
          >
            Зберегти
          </button>
        </div>
      </div>
    </>
  );
};

export default MyData;

import React, { useState } from "react";
import s from "./MyData.module.scss";
import { useDispatch } from "react-redux";
import { PatternFormat } from "react-number-format";

const MyData = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    surname: "",
    fathername: "",
    phone: "",
    email: "",
    deliveryPlace: "",
    deliveryAddress: "",
    extraInfo: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [dataErrors, setDataErrors] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    deliveryPlace: "",
    deliveryAddress: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [changedPassword, setChangedPassword] = useState(false);

  const dispatch = useDispatch();

  const validateChangeForm = (name, value) => {
    let errors = { ...dataErrors };
    switch (name) {
      case "name":
        errors.name = isValidData(value);
        break;
      case "surname":
        errors.surname = isValidData(value);
        break;
      case "phone":
        errors.phone = isValidData(value);
        break;
      case "email":
        errors.email = isValidEmail(value);
        break;
      case "deliveryPlace":
        errors.deliveryPlace = isValidData(value);
        break;
      case "deliveryAddress":
        errors.deliveryAddress = isValidData(value);
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

  const changeDataHandler = (event) => {
    setDataForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

    validateChangeForm(event.target.name, event.target.value);
    if (
      dataForm.name &&
      dataForm.surname &&
      dataForm.phone &&
      dataForm.email &&
      dataForm.deliveryPlace &&
      dataForm.deliveryAddress
    ) {
      setIsButtonDisabled(false);
    }
  };

  const submitChangeHandler = (e) => {
    e.preventDefault();
    if (
      dataForm.name &&
      dataForm.surname &&
      dataForm.phone &&
      dataForm.email &&
      dataForm.deliveryPlace &&
      dataForm.deliveryAddress
    ) {
      setIsButtonDisabled(false);
      console.log(dataForm);
      // setDataForm('')

      // dispatch(register({ email: registerForm.email, password: registerForm.password, confirmPassword: registerForm.confirmPassword}));

      // props.onSubmit(true);
      // } else if (!dataForm.name) {
      //   validateChangeForm("name", null);
      // } else if (!dataForm.surname) {
      //   validateChangeForm("surname", null);
      // } else if (!dataForm.phone) {
      //   validateChangeForm("phone", null);
      // } else if (!dataForm.email) {
      //   validateChangeForm("email", null);
      // } else if (!dataForm.deliveryPlace) {
      //   validateChangeForm("deliveryPlace", null);
      // } else if (!dataForm.deliveryAddress) {
      //   validateChangeForm("deliveryAddress", null);
      // }

      // try {
      //   const data = await axios.post('/api/auth/changeData', { ...dataForm })
      //   setDataForm({
      //     email: '', password: ''
      //   })
      // } catch (e) {
      //   console.log(e)
    }
  };

  const changeOldPassword = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
  };

  return (
    <>
      <form>
        <div className={s.form_content}>
          <div className={s.form_block}>
            <div className={s.form_group}>
              <label>Ім'я: *</label>
              <input
                type="text"
                name="name"
                className={`${s.form_input} ${
                  dataErrors.name ? s.input_error : ""
                }`}
                value={dataForm.name}
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
                name="surname"
                className={`${s.form_input} ${
                  dataErrors.surname ? s.input_error : ""
                }`}
                value={dataForm.surname}
                onChange={changeDataHandler}
              />
              {dataErrors.surname && (
                <div className={s.error_message}>{dataErrors.surname}</div>
              )}
            </div>
            <div className={s.form_group}>
              <label>По батькові:</label>
              <input
                type="text"
                name="fathername"
                className={s.form_input}
                value={dataForm.fathername}
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
                name="deliveryPlace"
                className={`${s.form_input} ${
                  dataErrors.deliveryPlace ? s.input_error : ""
                }`}
                value={dataForm.deliveryPlace}
                onChange={changeDataHandler}
              />
              {dataErrors.deliveryPlace && (
                <div className={s.error_message}>
                  {dataErrors.deliveryPlace}
                </div>
              )}
            </div>
            <div className={s.form_group}>
              <label>Адреса доставки: *</label>
              <input
                type="text"
                name="deliveryAddress"
                className={`${s.form_input} ${
                  dataErrors.deliveryAddress ? s.input_error : ""
                }`}
                value={dataForm.deliveryAddress}
                onChange={changeDataHandler}
              />
              {dataErrors.deliveryAddress && (
                <div className={s.error_message}>
                  {dataErrors.deliveryAddress}
                </div>
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

          <div className={s.form_block}>
            <div className={s.form_group}>
              <label>Новий пароль:</label>
              <input
                type="password"
                name="password"
                className={`${s.form_input} ${
                  dataErrors.password ? s.input_error : ""
                }`}
                value={dataForm.password}
                onChange={changeDataHandler}
              />
            </div>
            <div className={s.form_group}>
              <label>Підтвердити пароль:</label>
              <input
                type="password"
                name="confirmPassword"
                className={`${s.form_input} ${
                  dataErrors.confirmPassword ? s.input_error : ""
                }`}
                value={dataForm.confirmPassword}
                onChange={changeDataHandler}
              />
            </div>
            <div className={s.form_change_btn}>
              <button type="submit" onClick={changeOldPassword}>
                Змінити
              </button>
            </div>
          </div>

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
      </form>
    </>
  );
};

export default MyData;

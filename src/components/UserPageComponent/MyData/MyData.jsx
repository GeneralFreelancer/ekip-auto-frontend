import React, { useEffect, useState } from "react";
import s from "./MyData.module.scss";
import { useDispatch } from "react-redux";
import { PatternFormat } from "react-number-format";
import TextBlock from "../TextBlock/TextBlock";
import { fullUserRegistered } from "../../../redux/features/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

const MyData = () => {
  const [dataForm, setDataForm] = useState({
    firstName: "",
    lastName: "",
    secondName: "",
    phone: "",
    email: "",
    livingAddress: {
      city: "",
      street: "",
      additionalInfo: "",
    },
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
    livingAddress: {
      city: "",
      street: "",
      additionalInfo: "",
    },
    newPassword: "",
    confirmPassword: "",
  });

  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isBtnChangeDisabled, setIsBtnChangeDisabled] = useState(true);
  const [passwordMessage, setPasswordMessage] = useState(null);

  const navigate = useNavigate();

  const user = useSelector(selectedUser);
  const dispatch = useDispatch();

  const getDataFromBD = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setDataForm({ ...response.data.user });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getDataFromBD();
  }, []);

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
    const { name, value } = event.target;
    if (name.includes(".")) {
      const [parentProp, childProp] = name.split(".");
      setDataForm((prevState) => ({
        ...prevState,
        [parentProp]: {
          ...prevState[parentProp],
          [childProp]: value,
        },
      }));
    } else {
      setDataForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    validateChangeForm(event.target.name, event.target.value);
    // if (
    //   dataForm.firstName &&
    //   dataForm.lastName &&
    //   dataForm.phone &&
    //   dataForm.email &&
    //   dataForm.livingAddress.city &&
    //   dataForm.livingAddress.street
    // ) {
    //   setIsButtonDisabled(false);
    // }
  };

  const submitChangeHandler = async (e) => {
    e.preventDefault();
    if (
      dataForm.firstName &&
      dataForm.lastName &&
      dataForm.phone &&
      dataForm.email &&
      dataForm.livingAddress.city &&
      dataForm.livingAddress.street
    ) {
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
      } catch (e) {
        console.log(e);
      }
      navigate('/');
    }
  };

  const changePasswordHandler = async (e) => {
    setPassForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    validateChangeForm(e.target.name, e.target.value);
    if (passForm.newPassword && passForm.confirmPassword) {
      setIsBtnChangeDisabled(false);
    }
  };

  const submitPasswordHandler = async (e) => {
    e.preventDefault();
    if (passForm.newPassword === passForm.confirmPassword) {
      setIsBtnChangeDisabled(false);
      try {
        const response = await axios.post(
          `${baseUrl}/auth/password/change`,
          {
            password: passForm.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setPasswordMessage(response.data.message);
      } catch (e) {
        console.log(e);
      }
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
                onChange={(e) => changeDataHandler(e)}
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
                onChange={(e) => changeDataHandler(e)}
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
                onChange={(e) => changeDataHandler(e)}
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
                onChange={(e) => changeDataHandler(e)}
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
                onChange={(e) => changeDataHandler(e)}
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
                name="livingAddress.city"
                className={`${s.form_input} ${
                  dataErrors.city ? s.input_error : ""
                }`}
                value={dataForm.livingAddress.city}
                onChange={(e) => changeDataHandler(e)}
              />
              {dataErrors.livingAddress.city && (
                <div className={s.error_message}>
                  {dataErrors.livingAddress.city}
                </div>
              )}
            </div>
            <div className={s.form_group}>
              <label>Адреса доставки: *</label>
              <input
                type="text"
                name="livingAddress.street"
                className={`${s.form_input} ${
                  dataErrors.street ? s.input_error : ""
                }`}
                value={dataForm.livingAddress.street}
                onChange={(e) => changeDataHandler(e)}
              />
              {dataErrors.livingAddress.street && (
                <div className={s.error_message}>
                  {dataErrors.livingAddress.street}
                </div>
              )}
            </div>
          </div>

          <div className={s.form_block}>
            <div className={s.form_group}>
              <label>Додаткова інформація доставки:</label>
              <textarea
                type="text"
                name="livingAddress.additionalInfo"
                className={s.form_input}
                value={dataForm.livingAddress.additionalInfo}
                onChange={(e) => changeDataHandler(e)}
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
              {passwordMessage ? (
                <p style={{ marginTop: "5px" }} className={s.error_message}>
                  {passwordMessage}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>

        <div className={s.form_submit_btn}>
          <button
            type="submit"
            onClick={submitChangeHandler}
            // disabled={isButtonDisabled}
          >
            Зберегти
          </button>
        </div>
      </div>
    </>
  );
};

export default MyData;

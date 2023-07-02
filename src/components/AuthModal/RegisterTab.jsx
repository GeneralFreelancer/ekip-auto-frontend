import React, { useState } from "react";
import s from "./AuthModal.module.scss";
import { useDispatch } from "react-redux";
import { register } from "../../redux/features/userSlice";
import axios from "axios";

const RegisterTab = (props) => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [regiserErrors, setRegisterErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const validateRegisterForm = (name, value) => {
    let errors = { ...regiserErrors };
    switch (name) {
      case "email":
        errors.email = isValidEmail(value);
        break;
      case "password":
        errors.password = isValidPassword(value);
        break;
      case "confirmPassword":
        errors.confirmPassword = isValidConfirmPassword(value);
        break;
      default:
        break;
    }
    setRegisterErrors(errors);
  };

  function isValidEmail(value) {
    if (!value) {
      return "Введіть Email";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return "Email введено неправильно";
    }
  }

  function isValidPassword(value) {
    if (!value) {
      return "Введіть пароль";
    } else if (value.length < 6) {
      return "Пароль повинен містити не менше 6 символів";
    }
  }

  function isValidConfirmPassword(value) {
    if (!value) {
      return "Підтвердіть пароль";
    } else if (registerForm.password !== value) {
      return "Паролі не співпадають";
    }
  }

  const changeRegisterHandler = (event) => {
    setRegisterForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    validateRegisterForm(event.target.name, event.target.value);
  };

  const submitRegisterHandler = async (e) => {
    e.preventDefault();
    if (
      registerForm.email &&
      registerForm.password &&
      registerForm.password === registerForm.confirmPassword
    ) {
      dispatch(
        register({ email: registerForm.email, password: registerForm.password })
      );
      props.onSubmit(true);
    } else if (!registerForm.email) {
      validateRegisterForm("email", null);
    } else if (!registerForm.password) {
      validateRegisterForm("password", null);
    } else if (!registerForm.confirmPassword) {
      validateRegisterForm("confirmPassword", null);
    }
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        ...registerForm,
      });
      setRegisterForm({
        email: "",
        password: "",
      });
   
      console.log("User created:", response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleShowPasswordChange = (e) => setShowPassword(e.target.checked);

  return (
    <>
      <form>
        <div className={s.form_content}>
          <div className={s.form_group}>
            <label>Введіть Email:</label>
            <input
              type="email"
              name="email"
              className={`${s.form_input} ${
                regiserErrors.email ? s.input_error : ""
              }`}
              value={registerForm.email}
              onChange={changeRegisterHandler}
              placeholder="Email..."
            />
            {regiserErrors.email && (
              <div className={s.error_message}>{regiserErrors.email}</div>
            )}
          </div>
          <div className={s.form_hr}></div>
          <div className={s.form_group}>
            <label>Введіть пароль:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`${s.form_input} ${
                regiserErrors.password ? s.input_error : ""
              }`}
              value={registerForm.password}
              onChange={changeRegisterHandler}
              placeholder="Пароль..."
            />
            {regiserErrors.password && (
              <div className={s.error_message}>{regiserErrors.password}</div>
            )}
          </div>
          <div className={s.form_group}>
            <label>Підтвердити пароль:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className={`${s.form_input} ${
                regiserErrors.confirmPassword ? s.input_error : ""
              }`}
              value={registerForm.confirmPassword}
              onChange={changeRegisterHandler}
              placeholder="Пароль..."
            />
            {regiserErrors.confirmPassword && (
              <div className={s.error_message}>
                {regiserErrors.confirmPassword}
              </div>
            )}
          </div>
          <div className={s.form_group}>
            <label className={s.custom_checkbox}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handleShowPasswordChange}
              />
              <span className={s.checkmark}></span>
              <p>- Показати пароль</p>
            </label>
          </div>
          <div className={s.form_submit_btn}>
            <button type="submit" onClick={submitRegisterHandler}>
              Зареєструватися
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterTab;

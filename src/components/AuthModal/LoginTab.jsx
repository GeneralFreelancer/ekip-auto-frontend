import React, { useState } from "react";
import s from "./AuthModal.module.scss";

const LoginTab = (props) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const [loginErrors, setloginErrors] = useState({ email: "", password: "" });

  const validateLoginForm = (name, value) => {
    let errors = { ...loginErrors };
    switch (name) {
      case "email":
        errors.email = isValidEmail(value);
        break;
      case "password":
        errors.password = isValidPassword(value);
        break;
      default:
        break;
    }
    setloginErrors(errors);
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
    } else if (value.length < 5) {
      return "Пароль повинен містити не менше 5 символів";
    }
  }

  const changeLoginHandler = (event) => {
    const { name, value, checked } = event.target;
    const fieldValue = name === "rememberMe" ? checked : value;
    setLoginForm((prevState) => ({ ...prevState, [name]: fieldValue }));
    validateLoginForm(name, fieldValue);
  };

  const submitLoginHandler = (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      console.log(loginForm);
      localStorage.setItem("authSuccess", true); // LocalStorage
      props.onSubmit(true);
    } else if (!loginForm.email) {
      validateLoginForm("email", null);
    } else if (!loginForm.password) {
      validateLoginForm("password", null);
    }
    // try {
    //   const data = await axios.post("/api/auth/login", { ...loginForm });
    //   auth.login(data.token, data.userId);
    // } catch (e) {}
  };

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
                loginErrors.email ? s.input_error : ""
              }`}
              value={loginForm.email}
              onChange={changeLoginHandler}
              placeholder="Email..."
            />
            {loginErrors.email && (
              <div className={s.error_message}>{loginErrors.email}</div>
            )}
          </div>
          <div className={s.form_group}>
            <label>Введіть пароль:</label>
            <input
              type="password"
              name="password"
              className={`${s.form_input} ${
                loginErrors.password ? s.input_error : ""
              }`}
              value={loginForm.password}
              onChange={changeLoginHandler}
              placeholder="Пароль..."
            />
            {loginErrors.password && (
              <div className={s.error_message}>{loginErrors.password}</div>
            )}
          </div>
          <div className={s.form_group}>
            <label className={s.custom_checkbox}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={loginForm.rememberMe}
                onChange={changeLoginHandler}
              />
              <span className={s.checkmark}></span>
              <p>- Запам'ятати мене</p>
            </label>
          </div>
          <div className={s.form_submit_btn}>
            <button type="submit" onClick={submitLoginHandler}>
              Увійти
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginTab;
